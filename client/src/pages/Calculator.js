import ScenarioButton from "../components/ScenarioButton";
import { useState } from "react";

const items = [
    {
      image: "/images/water.png",
      label: "Ջուր",
      kcal: "0",
    },
    {
      image: "/images/clothes.jpg",
      label: "Snickers",
      kcal: 250,
    },
    {
      image: "/images/drinks.jpg",
      label: "Խտացրած կաթ",
      kcal: 1200,
    },
    {
      image: "/images/documents.jpg",
      label: "Սուխարիկ",
      kcal: 380,
    },
    {
      image: "/images/documents.jpg",
      label: "Պահածոյացված միս",
      kcal: 800,
    },
    {
      image: "/images/documents.jpg",
      label: "Ընդեղեն",
      kcal: 650,
    }, 
    {
      image: "/images/documents.jpg",
      label: "Մեղր",
      kcal: 330,
    },
    {
      image: "/images/documents.jpg",
      label: "չիր",
      kcal: 250,
    },
    {
      image: "/images/documents.jpg",
      label: "Սեւ շոկոլադ",
      kcal: 550,
    },
    {
      image: "/images/documents.jpg",
      label: "Սալ",
      kcal: 800,
    }, 
];
const Alarm = () => {
  const [selectedCounts, setSelectedCounts] = useState({});

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

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">Տագնապի Պայուսակ</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center">
        {items.map((item, i) => {
          const count = selectedCounts[item.label] || 0;
          return (
            <div
              key={i}
              onClick={() => handleClick(item.label)}
              className={`relative p-1 rounded-xl cursor-pointer transform transition-transform hover:scale-105 ${
                count > 0 ? "ring-4 ring-yellow-400" : ""
              }`}
            >
              {/* div change bigger in hover time */}
              <ScenarioButton image={item.image} label={item.label} />

              {count > 0 && (
                <>
                  <div className="absolute top-1 right-1 bg-yellow-400 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {count}
                  </div>

                  <button
                    className="absolute bottom-1 left-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full hover:bg-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset(item.label);
                    }}
                  >
                    ✖
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alarm;