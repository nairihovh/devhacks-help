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
  const [loading, setLoading] = useState(true);
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
      try {
        const res = await getUser(tgUser?.id);
        if (res) {
          setUser(res);
        } else {
          setUser(null); // Make sure it's explicitly null
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false); // Always set loading to false
      }
    };
    
    useEffect(() => {
      if (!tgUser?.id) return;
      getCurrentUser();
    }, [tgUser])
    // if (loading) {
    //   return (
        
    //   )
    // }
    return (
      <>
        {loading ? (
          <p className="text-gray-600 text-center">Բեռնում է...</p>
        ) : !user ? (
          <div
          className="max-w-md mx-auto mt-6 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg text-[#5C1F0C]"
          >
            <h2 className="text-2xl font-bold text-center mb-4">Ձեր տվյալները</h2>
            
            <div className="space-y-4">
              <div>
                {/* <label for="name" className="block mb-1 font-semibold">Անուն (Telegram-ից)</label> */}
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
                  {/* <label for="age" className="block mb-1 font-semibold">Տարիք</label> */}
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
                  {/* <label for="weight" className="block mb-1 font-semibold">Քաշ (կգ)</label> */}
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
                  {/* <label for="height" className="block mb-1 font-semibold">Հասակ (սմ)</label> */}
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
                  {/* <label for="city" className="block mb-1 font-semibold">Քաղաք</label> */}
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
        ) : (
          <></>
        )}
      </>
    );    
};

export default Home;
