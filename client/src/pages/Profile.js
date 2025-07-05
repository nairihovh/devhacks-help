import { useState } from "react";
import useTelegram from "../hooks/useTelegram";
import getUser from "../hooks/useUser";
import useUser from "../hooks/useUser";
import { useEffect } from "react";
import ScenarioButton from "../components/ScenarioButton";
import { API_URL } from "../config/config";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
    const { tgUser } = useTelegram();
    const [user, setUser] = useState(null)
    const [showAdditionalInformation, setShowAdditionalInformation] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [registeredStatus, setRegisteredStatus] = useState();
    const registerUser = async () => {
      try {
        await axios.post(`${API_URL}/api/user/register`, {
          tgUser: tgUser,
          data: data,
        },
        {
          withCredentials: true,
        })
        getCurrentUser();
        setRegisteredStatus(true);
      } catch (error) {
        setRegisteredStatus(false);
      }
    }

    const getCurrentUser = async () => {
      try {
        const res = await getUser(tgUser?.id);
        if (res) {
          setUser(res);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      if (tgUser?.id) {
        getCurrentUser();
      }
    }, [tgUser]);
    return (
      <div className="bg-white/80 shadow-2xl rounded-2xl p-8 max-w-sm text-center">
    
        {loading ? (
          <p className="text-gray-600 text-center">Բեռնում է...</p>
        ) : user ? (
          <div className="text-center">
            <img
              src={user.photo_url}
              alt="User"
              className="w-[150px] h-[150px] rounded-full mx-auto shadow-md mb-4 border-4 border-[#ffcb02]"
            />
            <h3 className="text-xl font-semibold text-[#5C1F0C] mb-2">
              {user.name}
            </h3>
    
            <div className="relative bg-white/30 rounded-full h-6 w-64 mx-auto overflow-hidden shadow-inner mb-2">
              <div
                className="bg-yellow-300 h-full transition-all duration-500 ease-in-out"
                style={{
                  width: `${(user.xp % 1000) / 10}%`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-[#5C1F0C] font-bold text-sm">
                {user.xp} XP
              </div>
            </div>
            <p className="text-sm text-[#5C1F0C] opacity-70 mb-4">
              {Math.floor(user.xp / 1000) + 1} Level
            </p>
            
            <div className="flex flex-row gap-4 mt-4 justify-between">
              <ScenarioButton
                to="/alarm"
                cover={true}
                label="Տագնապի պայուսակ"
                image="/images/tagnap-bag.png"
              />
              <ScenarioButton
                label="Գոյատեւման հաշվիչ"
                to="/Calculator_of_survival"
                image="/images/calculator.png"
              />
            </div>
            <div className="flex flex-row gap-4 mt-4 justify-between">
            <Link
              to="/games"
              className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-yellow-300 to-yellow-200 hover:from-yellow-300 hover:to-yellow-500 transition-all text-[#5C1F0C] font-bold py-4 px-6 rounded-2xl shadow-lg text-lg"
            >
              <img src="/images/game.png" alt="Gamepad" className="w-6 h-6" />
              Խաղալ
            </Link>
            </div>
            <button
              onClick={() => setShowAdditionalInformation(!showAdditionalInformation)}
              className="mb-3 mt-[20px] bg-yellow-300 hover:bg-yellow-400 text-[#5C1F0C] font-bold px-6 py-3 rounded-xl shadow-md transition-all duration-300"
            >
              {showAdditionalInformation ? "Փակել" : "Անձնական տվյալներ"}
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
          <div
          className="max-w-md mx-auto mt-6 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg text-[#5C1F0C]"
          >
            <h2 className="text-2xl font-bold text-center mb-4">Ձեր տվյալները</h2>
            
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={tgUser?.first_name}
                  className="w-full p-2 rounded-lg bg-white/80 text-gray placeholder-gray focus:outline-none"
                  placeholder="Անուն"
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>
    
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    id="age"
                    className="w-full p-2 rounded-lg bg-white/80 text-gray placeholder-gray focus:outline-none"
                    placeholder="Տարիք"
                    name="age"
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <input
                    type="number"
                    id="weight"
                    className="w-full p-2 rounded-lg bg-white/80 text-gray placeholder-gray focus:outline-none"
                    placeholder="Քաշ"
                    name="weight"
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
    
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    id="height"
                    className="w-full p-2 rounded-lg bg-white/80 text-gray placeholder-gray focus:outline-none"
                    placeholder="Հասակ"
                    name="height"
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="city"
                    className="w-full p-2 rounded-lg bg-white/80 text-gray placeholder-gray focus:outline-none"
                    placeholder="Քաղաք"
                    name="city"
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
    
              <button
                type="submit"
                onClick={registerUser}
                className="w-full bg-yellow-300 hover:bg-yellow-400 text-[#5C1F0C] font-bold py-2 rounded-lg shadow"
              >
                Շարունակել
              </button>
            </div>
          </div>
        )}
      </div>
    );    
}
export default Profile;