// Leaderboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/config";

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]);

  const getTopUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/user/getTopUsers`, {
        withCredentials: true,
      });
      if (res?.data?.topUsers) {
        setTopUsers(res.data.topUsers);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTopUsers();
  }, []);

  return (
    <div className="space-y-4">
      {/* <h1 className="text-2xl font-bold text-center mb-6">Լավագույն օգտատերեր</h1> */}
      {topUsers.slice(0, 10).map((user, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between shadow-md"
        >
          <div className="flex items-center gap-4">
            <img
              src={user.photo_url}
              alt={user.name}
              className="w-14 h-14 rounded-full border-2 border-white"
            />
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm opacity-80">{user.xp} XP</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-yellow-300">#{index + 1}</div>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
