import { db } from "../firebase.js";
import { doc, setDoc, updateDoc, getDoc, collection, getDocs, arrayUnion } from "firebase/firestore";

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
  }, { merge: true });
};

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
    console.log(member_data)
    users.push(member_data)
  }
  console.log(users)
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