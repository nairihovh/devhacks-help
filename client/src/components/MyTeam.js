// MyTeam.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTelegramPlane } from "react-icons/fa";
import { API_URL } from "../config/config";
import useTelegram from "../hooks/useTelegram";
import getUser from "../hooks/useUser";

const MyTeam = () => {
  const [generatedLink, setGeneratedLink] = useState();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [myTeamName, setMyTeamName] = useState("Արագ օգնություն");
  const { tgUser } = useTelegram();
  const [createdTeamStatus, setCreatedTeamStatus] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [user, setUser] = useState(null);

  const getCurrentUser = async () => {
    const res = await getUser(tgUser?.id);
    if (res) setUser(res);
  };

  const getTeamMembers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/user/getTeamMembers?userId=${tgUser?.id}`, {
        withCredentials: true,
      });
      if (res?.data?.users) {
        setTeamMembers(res.data.users);
      }
    } catch (error) {
    }
  };
  useEffect(() => {
    if (!tgUser?.id) return;
    getTeamMembers();
    getCurrentUser();
  }, [tgUser, createdTeamStatus]);

  const createNewTeam = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/user/createTeam`,
        {
          teamName: teamName,
          userId: tgUser?.id,
        },
        { withCredentials: true }
      );
      console.log(res);
      setCreatedTeamStatus(true);
      setShowCreateModal(false)
    } catch (error) {
      setCreatedTeamStatus(false);
    }
  };

  return (
    <>
      {/* <h1 className="text-2xl font-bold text-center mb-6">Իմ Թիմը</h1> */}
      {user?.team && (
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
            Թիմի Անունը՝ {user?.team}
          </h2>
          <p className="text-sm text-[#5C1F0C] opacity-80 mt-1">Դու այս թիմի անդամ ես</p>
        </div>
      )}
      <div className="space-y-4">
        <div className="flex justify-between mb-4">
          {user && !user?.team && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
            >
              Ստեղծել թիմ
            </button>
          )}
        </div>
        {teamMembers.length <= 0 && user?.team && (
          <p className="text-gray-600 text-center">Բեռնում է...</p>
        )}
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-4">
              <img
                src={member.photo_url}
                alt={member.name}
                className="w-14 h-14 rounded-full border-2 border-white"
              />
              <div>
                <h2 className="text-lg font-semibold">{member.name}</h2>
                <p className="text-sm opacity-80">{member.role}</p>
              </div>
            </div>
            {member?.username && (
              <a
                href={`https://t.me/${member.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-300 hover:bg-yellow-400 text-[#5C1F0C] p-2 rounded-full"
              >
                <FaTelegramPlane />
              </a>
            )}
          </div>
        ))}
        {user?.team && (
            <div
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between shadow-md"
              onClick={() => {
                const teamSlug = encodeURIComponent(
                  myTeamName.trim().toLowerCase().replace(/\s+/g, "_")
                );
                const joinLink = `https://t.me/studysurvivalbot?start=join_${teamSlug}`;
                if (navigator.share) {
                  navigator
                    .share({
                      title: "Միացիր մեր թիմին",
                      text: `Միացիր մեր թիմին՝ ${teamName}`,
                      url: joinLink,
                    })
                    .catch((err) => console.log("Sharing error", err));
                } else {
                  window.open(joinLink, "_blank");
                }
              }}
            >
              <div className="flex items-center gap-4">
                  Ավելացնել թիմի անդամ
              </div>
            </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4 relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-2 text-black">Ստեղծել նոր թիմ</h2>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Մուտքագրեք թիմի անունը"
              className="w-full border rounded-lg p-2 text-black"
            />
            <button
              onClick={createNewTeam}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full"
            >
              Ստեղծել թիմ
            </button>

            {generatedLink && (
              <div className="mt-4">
                <p className="text-sm text-gray-800">Միանալու հղումը։</p>
                <a
                  href={generatedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 break-all underline"
                >
                  {generatedLink}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyTeam;
