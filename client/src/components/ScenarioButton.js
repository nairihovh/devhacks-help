// src/components/ScenarioButton.jsx
import { Link } from "react-router-dom";

const ScenarioButton = ({ to, image, label, bgColor = "bg-yellow-50" }) => {
  return (
    <Link
      to={to}
      className={`${bgColor} w-[160px] h-[200px] text-[#5C1F0C] rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center p-4`}
    >
      <img
        src={image}
        alt={label}
        className="w-20 h-20 object-contain mb-3"
      />
      <span className="text-center text-lg font-semibold">{label}</span>
    </Link>
  );
};

export default ScenarioButton;
