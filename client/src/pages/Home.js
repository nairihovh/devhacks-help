// src/components/Header.jsx
import { useState } from "react";
import ScenarioButton from "../components/ScenarioButton";
import useTelegram from "../hooks/useTelegram";
import getUser from "../hooks/useUser";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/config";

const Home = () => {
  const { tgUser } = useTelegram();
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
    const [user, setUser] = useState(null)
    const getCurrentUser = async () => {
      const res = await getUser(tgUser?.id);
      if (res) setUser(res);
    }
    useEffect(() => {
      if (!tgUser?.id) return;
      getCurrentUser();
    }, [tgUser])

    return (
      <>
        {!user ? (
          <div className="max-w-md mx-auto mt-6 bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-[#5C1F0C]">
            <h2 className="text-2xl font-bold text-center mb-4">Ձեր տվյալները</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">Անուն (Telegram-ից)</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={tgUser?.first_name}
                  className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none"
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
                  <label className="block mb-1 font-semibold">Տարիք</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none"
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
                  <label className="block mb-1 font-semibold">Քաշ (կգ)</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none"
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
                  <label className="block mb-1 font-semibold">Հասակ (սմ)</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none"
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
                  <label className="block mb-1 font-semibold">Քաղաք</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none"
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
        ) : (
          <div className="flex flex-row gap-4 mt-6 justify-center flex-wrap">
            <ScenarioButton to="/alarm" image="/images/tagnap-bag.png" />
            <ScenarioButton to="/Calculator_of_survival" image="/images/calculator.png" />
          </div>
        )}
      </>
    );    
};

export default Home;
