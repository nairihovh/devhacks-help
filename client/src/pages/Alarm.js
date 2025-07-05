import ScenarioButton from "../components/ScenarioButton";
import { useState } from "react";

const items = [
    {
      image: "/images/self-items.jpg",
      label: "Անձնական պարագաներ",
      contents: [
        { name: "Ատամի խոզանակ", available: true, description: "Օգտագործվում է ատամները մաքրելու համար" },
        { name: "Անձեռոցիկ", available: false, description: "Դիմային և ձեռքերի մաքրության համար" },
        { name: "Ձեռնոց", available: true, description: "Ձեռքերը պաշտպանելու համար" },
      ]
    },
    {
      image: "/images/clothes.jpg",
      label: "Հագուստ",
      contents: [
        { name: "Բաճկոն", available: true, description: "" },
        { name: "Նախշավոր գուլպա", available: false },
      ],
    },
    {
      image: "/images/drinks.jpg",
      label: "Ըմպելիքներ",
      contents: [
        { name: "Ջուր", available: true },
        { name: "Հյութ", available: false },
      ],
    },
    {
      image: "/images/documents.jpg",
      label: "Փաստաթղթեր",
      contents: [
        { name: "Անձնագիր", available: true },
        { name: "Սոցիալական քարտ", available: false },
      ],
    },
];


const Alarm = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">Տագնապի Պայուսակ</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center">
        {items.map((item, i) => (
          <div key={i} onClick={() => setSelected(item)}>
            <ScenarioButton image={item.image} label={item.label} />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white text-[#5C1F0C] p-6 rounded-2xl w-[90%] max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4">{selected.label}</h2>

            <ul className="space-y-2 mb-4">
              {selected.contents.map((item, idx) => (
                <li
                  key={idx}
                  className={`relative group flex justify-between items-center px-3 py-2 rounded-lg transition
                    ${item.available
                      ? "bg-black/30 hover:bg-black/40 text-green line-through"
                      : "bg-black/10 text-black-400 cursor-not-allowed"}`}
                >
                  {item.description && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max max-w-xs text-sm bg-[#c48976] text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none z-50 shadow-lg">
                      {item.description}
                    </div>
                  )}
                  <span className="text-sm">{item.name}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelected(null)}
              className="bg-[#5C1F0C] text-white px-4 py-2 rounded-xl hover:bg-[#4a190a] transition"
            >
              Փակել
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alarm;
