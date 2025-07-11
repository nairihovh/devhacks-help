import ScenarioButton from "../components/ScenarioButton";
import { useState } from "react";
import useTelegram from "../hooks/useTelegram";
import getUser from "../hooks/useUser";
import { useEffect } from "react";

const items = [
  { image: "/images/water.png", label: "Ջուր", kcal: 0, used: 0 },
  { image: "/images/snickers.png", label: "Բատոնչիկ", kcal: 250, used: 0 },
  { image: "/images/Condensed_milk.png", label: "Խտացրած կաթ", kcal: 1200, used: 0 },
  { image: "/images/army_galets.png", label: "Չորահաց", kcal: 380, used: 0 },
  { image: "/images/Canned_meat.png", label: "Պահածոյացված միս", kcal: 800, used: 0 },
  { image: "/images/nuts.png", label: "Ընդեղեն", kcal: 650, used: 0 },
  { image: "/images/honey.png", label: "Մեղր", kcal: 330, used: 0 },
  { image: "/images/Dried_fruits.png", label: "Չիր", kcal: 250, used: 0 },
  { image: "/images/chocolate.png", label: "Սեւ շոկոլադ", kcal: 550, used: 0 },
];

const Alarm = () => {
  const [selectedCounts, setSelectedCounts] = useState({});
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

  const handleClick = (label) => {
    setSelectedCounts((prev) => ({
      ...prev,
      [label]: (prev[label] || 0) + 1,
    }));
  };

  const handleReset = (label) => {
    setSelectedCounts((prev) => {
      const updated = { ...prev };
      delete updated[label];
      return updated;
    });
  };

  const totalKcal = items.reduce((sum, item) => {
    const count = selectedCounts[item.label] || 0;
    return sum + item.kcal * count;
  }, 0);

  const weight = parseInt(user?.data?.weight);
  const height = parseInt(user?.data?.height);
  const age = parseInt(user?.data?.age);
  
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5; 
  
  const days = Math.floor(totalKcal / bmr);
  const remainingKcal = totalKcal % bmr;
  const hours = Math.floor((remainingKcal / bmr) * 24);

  const waterUsed = selectedCounts["Ջուր"] || 0;

  let about_wather = "";

  if (days * 2 > waterUsed || (days === 0 && waterUsed < 2 && hours != 0)) {
    about_wather = "Անհրաժեշտ է ջրի քանակը ավելացնել 💧";
  } else {
    about_wather = "";
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-2 text-center">Գոյատեւման հաշվիչ</h1>

      <div className="text-center text-lg font-semibold text-yellow-300 mb-4 p-4 rounded-2xl shadow-lg bg-black/50 backdrop-blur-sm">
        Պաշարի քանակը կբավականցնի՝ {days} օր, {hours} ժամ
      </div>

      <div className="text-center text-lg font-semibold text-yellow-300 mb-4">
        {about_wather} 
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center">
        {items.map((item, i) => {
          const count = selectedCounts[item.label] || 0;
          return (
            <div
              key={i}
              onClick={() => handleClick(item.label)}
              className={`relative p-1 rounded-xl cursor-pointer transform transition-transform ${
                count > 0 ? "ring-4 ring-yellow-400 scale-100" : "hover:scale-100"
              }`}
            >
              <ScenarioButton setBorder={true} image={item.image} label={item.label} />

              {count > 0 && (
                <div className="absolute inset-0">
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full z-10">
                    {count}
                  </div>

                  <button
                    className="absolute -bottom-2 -left-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-700 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset(item.label);
                    }}
                  >
                    ✖
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alarm;