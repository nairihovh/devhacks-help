import * as db from "../firebase/functions.js";

export async function registerUser(req, res) {
  try {
    const {tgUser, data} = req.body;

    if (!tgUser || !data) {
      return res.status(400).json({ error: "tgUser or data are not specified" });
    }

    const user = await db.getUserById(tgUser.id);
    if (user) {
      return res.status(200).json({ success: false, message: "User is already registered" });
    }

    await db.saveTelegramUser(tgUser, data);

    return res.status(200).json({ success: true, message: "User registered" });

  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createTeam(req, res) {
  try {
    const {teamName, userId} = req.body;

    if (!teamName) {
      return res.status(400).json({ error: "teamName is not specified" });
    }

    const user = await db.getUserById(userId);
    if (!user) {
      return res.status(200).json({ success: false, message: "User not found" });
    }

    const team = await db.getTeam(teamName);
    if (team) {
      return res.status(400).json({success: false, message: "Team with that name already exists"});
    }

    const result = await db.createTeam(teamName, userId);
    if (!result) {
      return res.status(200).json({ success: true, message: "Team created successfully" });
    }


  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


export async function getUserById (req, res) {
  try {
    const id = req?.query?.user_id;
    
    if (!id) {
      return res.status(400).json({error: "user_id is not specified"})
    }

    const user = await db.getUserById(id);
    if (!user) {
      return res.status(400).json({error: "User not found"})
    }
    return res.status(200).json(user);
  } catch (error) {
  }
}

export async function getTopUsers (req, res) {
  try {
    const users = await db.getTopUsers();
    if (!users) {
      return res.status(400).json({error: "User not found"})
    }
    return res.status(200).json(users);
  } catch (error) {
    return null
  }
}

export async function getTeamMembers (req, res) {
  try {
    const userId = req?.query?.userId;
    
    if (!userId) {
      return res.status(400).json({error: "userId is not specified"})
    }

    const teamMembers = await db.getTeamMembers(userId);
    if (!teamMembers) {
      return res.status(400).json({error: "teamMembers not found"})
    }
    return res.status(200).json(teamMembers);
  } catch (error) {
  }
}

export async function addXP (req, res) {
  try {
    const userId = req?.body?.userId;
    
    if (!userId) {
      return res.status(400).json({error: "userId is not specified"})
    }

    const teamMembers = await db.addXP(userId);
    if (!teamMembers) {
      return res.status(400).json({error: "teamMembers not found"})
    }
    return res.status(200).json(teamMembers);
  } catch (error) {
  }
}