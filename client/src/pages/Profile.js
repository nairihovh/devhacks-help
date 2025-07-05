import { useState } from "react";
import useTelegram from "../hooks/useTelegram";
import getUser from "../hooks/useUser";
import useUser from "../hooks/useUser";
import { useEffect } from "react";
import ScenarioButton from "../components/ScenarioButton";

const Profile = () => {
    const { tgUser } = useTelegram();
    const [user, setUser] = useState(null)
    const [showAdditionalInformation, setShowAdditionalInformation] = useState(false);
    const getCurrentUser = async () => {
      const res = await getUser(tgUser?.id);
      if (res) setUser(res);
    }
    useEffect(() => {
      if (!tgUser?.id) return;
      getCurrentUser();
    }, [tgUser])
    return (
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-sm text-center">
        <h2 className="text-3xl font-bold text-[#5C1F0C] mb-4">Բարի Գալու՜ստ</h2>
    
        {user ? (
          <div className="text-center">
            <img
              src={user.photo_url}
              alt="User"
              className="w-24 h-24 rounded-full mx-auto shadow-md mb-4"
            />
            <h3 className="text-xl font-semibold text-[#5C1F0C] mb-2">
              {user.name}
            </h3>
    
            {/* XP Progress Bar */}
            <div className="relative bg-white/30 rounded-full h-6 w-64 mx-auto overflow-hidden shadow-inner mb-2">
              <div
                className="bg-yellow-300 h-full transition-all duration-500 ease-in-out"
                style={{
                  width: `${(user.xp % 1000) / 10}%`, // Assuming level every 1000 XP
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-[#5C1F0C] font-bold text-sm">
                {user.xp} XP
              </div>
            </div>
            <p className="text-sm text-[#5C1F0C] opacity-70 mb-4">
              Level {Math.floor(user.xp / 1000) + 1}
            </p>
            <button
              onClick={() => setShowAdditionalInformation(!showAdditionalInformation)}
              className="mb-3 bg-yellow-300 hover:bg-yellow-400 text-[#5C1F0C] font-bold px-6 py-3 rounded-xl shadow-md transition-all duration-300"
            >
              {showAdditionalInformation ? "Փակել հավելյալ ինֆորմացիան" : "Հավելյալ ինֆորմացիա"}
            </button>
            {showAdditionalInformation && (
              <div className="text-left space-y-2 text-[#5C1F0C] text-sm font-medium transiotion-1s">
                <p><span className="font-semibold">Տարիք:</span> {user.data?.age}</p>
                <p><span className="font-semibold">Քաշ:</span> {user.data?.weight} կգ</p>
                <p><span className="font-semibold">Հասակ:</span> {user.data?.height} սմ</p>
                <p><span className="font-semibold">Քաղաք:</span> {user.data?.city}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-600 text-center">Loading user info...</p>
        )}
      </div>
    );    
}

export default Profile;