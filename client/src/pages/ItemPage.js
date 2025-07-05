import { useState, useEffect } from "react";
import { items } from "../db/bag";
import { useParams } from "react-router-dom";
import getUser from "../hooks/useUser";
import useTelegram from "../hooks/useTelegram";
import axios from "axios";
import { API_URL } from "../config/config";

const ItemPage = () => {
  const [selected, setSelected] = useState(null);
  const [buyingItem, setBuyingItem] = useState(null);
  const [animateItem, setAnimateItem] = useState(null);
  const { name } = useParams();
  const { tgUser } = useTelegram();
  const [user, setUser] = useState(null);

  const getCurrentUser = async () => {
    const res = await getUser(tgUser?.id);
    if (res) setUser(res);
  };
  useEffect(() => {
    if (!tgUser?.id) return;
    getCurrentUser();
  }, [tgUser]);

  const item = items.find((x) => x.label === name);

  const handleBuy = (item) => {
    setBuyingItem(item);
  };

  const buyItem = async () => {
    try {
        const res = await axios.post(`${API_URL}/api/user/buyEmergencyItem`, {
            itemName: buyingItem?.name,
            userId: tgUser?.id
        })
        return res
    } catch (error) {
        return null
    }
  }

  const confirmBuy = async () => {
    const res = await buyItem();
    if (res?.status === 200) {
        setAnimateItem(buyingItem);
        setBuyingItem(null);
        const correctSound = new Audio("/sounds/buy-item.mp3");
        correctSound.play();
        setTimeout(() => setAnimateItem(null), 1000);
        await getCurrentUser();
    }else {
        alert("inucent")
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 relative">
      {/* Top UI */}
      <div className="grid grid-cols-2 mb-8 gap-10 justify-center">
        <div className="text-[#5C1F0C] rounded-2xl text-center relative">
          <p className="font-bold">{user?.xp ?? 10} XP</p>
          <img src="/images/sunduk.png" alt="sunduk" className="w-[900px] object-cover mx-auto mb-2" />
        </div>
        <div className="rounded-2xl p-4 text-center">
          <img src={`/images/tagnap-bag${animateItem ? "-light":""}.png`} alt="bag" className="w-50 mx-auto" />
        </div>
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center">
        {item?.contents?.map((it, i) => (
          <div
            key={i}
            onClick={() => {
                if (!user?.emergency_items.includes(it.name)) {
                    handleBuy(it)
                }
            }}
            className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow hover:scale-105 transition cursor-pointer"
          >
            <div className="absolute top-1 right-1 bg-yellow-400 text-[#5C1F0C] font-bold text-xs px-2 py-1 rounded-full shadow-md ring-2 ring-white/60">
                {user?.emergency_items.includes(it.name) ? 
                <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                    ✅
                </span>
                : it.price}
            </div>
            <img src={it.image} alt={it.name} className="w-full h-28 object-contain p-2" />
            <p className="text-center text-sm font-semibold text-white py-2">{it.name}</p>
          </div>
        ))}
      </div>

      {/* Confirm Purchase Modal */}
      {buyingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center space-y-4">
            <img src={buyingItem.image} alt={buyingItem.name} className="w-24 h-24 mx-auto" />
            <p className="text-lg text-black font-bold">Գնե՞լ {buyingItem.name}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={confirmBuy}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >Այո</button>
              <button
                onClick={() => setBuyingItem(null)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >Ոչ</button>
            </div>
          </div>
        </div>
      )}

      {/* Animate Purchase */}
      {animateItem && (
        <img
          src={animateItem.image}
          alt="item animation"
          className="fixed z-50 top-1/2 left-1/2 w-32 h-32 transform -translate-x-1/2 -translate-y-1/2 animate-fly-to-bag"
        />
      )}

      {/* Animation styles */}
      <style>
        {`
          @keyframes flyToBag {
            0% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(120%, -320%) scale(0.3);
              opacity: 0;
            }
          }

          .animate-fly-to-bag {
            animation: flyToBag 4s forwards;
          }
        `}
      </style>
    </div>
  );
};

export default ItemPage;
