import { db } from "../firebase.js";
import { doc, setDoc, updateDoc, getDoc, collection, getDocs, arrayUnion, query, orderBy, limit } from "firebase/firestore";

export const saveTelegramUser = async (telegramUser, data) => {
  await setDoc(doc(db, "users", telegramUser.id.toString()), {
    telegram_id: telegramUser.id,
    name: telegramUser.first_name + " " + (telegramUser.last_name || ""),
    username: telegramUser.username,
    language: telegramUser.language_code,
    photo_url: telegramUser.photo_url,
    created_at: Date.now(),
    xp: 0,
    level: 0,
    completed_scenarios: [],
    data: data,
    team: null,
    emergency_items: []
  }, { merge: true });
};

export const getTopUsers = async (count = 10) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("xp", "desc"), limit(count));
    const querySnapshot = await getDocs(q);
    
    const topUsers = [];
    querySnapshot.forEach((doc) => {
      topUsers.push(doc.data());
    });

    return {topUsers};
  } catch (error) {
    console.error("Error fetching top users:", error);
    return null;
  }
};

export const getEmergencyItems = async () => {
  try {
    const itemsRef = collection(db, "emergency_items");
    const querySnapshot = await getDocs(itemsRef);

    const items = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return items;
  } catch (error) {
    console.error("Error fetching emergency items:", error);
    return null;
  }
};

export const addXP = async (userId) => {
  const userRef = doc(db, "users", userId.toString());
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    return null;
  }
  const userData = userSnap.data();
  await setDoc(userRef, {
    xp: userData.xp + 5,
  }, { merge: true });
}

export const buyEmergencyItem = async (itemName, userId) => {
  const userRef = doc(db, "users", userId.toString());
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    return null;
  }
  const userData = userSnap.data();
  const items = await getEmergencyItems();
  if (!items) return { status: 404, data: "Items not found"};
  const currentItem = items
    .flatMap(group => group.contents)
    .find(item => item.name === itemName);
  if (!currentItem) return { status: 404, data: "Item with that name not found"};
  if (currentItem?.price >= userData.xp) return { status: 400, data: "You have not such balance to buy this item"};
  const newItems = [
    ...(userData?.emergency_items || []),
    currentItem.name
  ];
  
  await setDoc(userRef, {
    emergency_items: newItems,
    xp: userData.xp - currentItem.price
  }, { merge: true });
  return { status: 200, data: "Buyed successfully"}
}

export const createTeam = async (teamName, userId) => {
  const userRef = doc(db, "users", userId.toString());
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  const userData = userSnap.data();

  if (userData.team) {
    return null;
  }

  const teamRef = doc(db, "teams", teamName);
  const teamSnap = await getDoc(teamRef);

  if (teamSnap.exists()) {
    return null;
  }

  await setDoc(teamRef, {
    teamName: teamName,
    members: [userId],
  });

  await setDoc(userRef, {
    team: teamName,
  }, { merge: true });

  return teamSnap.data();
};

export const getTeamMembers = async (userId) => {
  const user = await getUserById(userId);
  if (!user) return null;

  const docRef = doc(db, "teams", user?.team);
  const teamSnap = await getDoc(docRef);
  if (!teamSnap.exists()) {
    return null;
  }
  const users = [];
  for (const member of teamSnap.data().members) {
    const member_data = await getUserById(member);
    users.push(member_data)
  }
  return {users};
};

export const getUserById = async (telegramId) => {
  const docRef = doc(db, "users", telegramId.toString());
  const userSnap = await getDoc(docRef);
  return userSnap.exists() ? userSnap.data() : null;
};

export const getTeam = async (teamName) => {
  const docRef = doc(db, "teams", teamName);
  const teamSnap = await getDoc(docRef);
  return teamSnap.exists() ? teamSnap.data() : null;
};

export const updateUserProgress = async (telegramId, xpEarned = 10) => {
  const userRef = doc(db, "users", telegramId.toString());
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return null;

  const current = userSnap.data();
  const newXp = (current.xp || 0) + xpEarned;
  const newLevel = Math.floor(newXp / 100); // 100xp per level

  await updateDoc(userRef, {
    xp: newXp,
    level: newLevel,
  });

  return { xp: newXp, level: newLevel };
};

export const completeScenario = async (telegramId, scenarioId) => {
  const userRef = doc(db, "users", telegramId.toString());
  await updateDoc(userRef, {
    completed_scenarios: arrayUnion(scenarioId),
  });
};