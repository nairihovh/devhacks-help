// src/components/ScenarioButton.jsx
import { Link } from "react-router-dom";

const ScenarioButton = ({ cover=false, to, image, label, bgColor = "bg-yellow-50", setBorder = false }) => {
  return (
    <Link
      to={to}
      className={`${bgColor} w-[160px] h-[${label ? "240px" : "180px"}] text-[#5C1F0C] rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center overflow-hidden`}
    >
      <div className="w-full h-[180px]">
        <img
          src={image}
          alt={label}
          className={`w-full h-full ${cover ? "object-cover" : ""} rounded-t-2xl ${setBorder ? "border-4 border-white" : ""}`}
        />
      </div>
      {label != "" && (
            <div className="p-2 h-[60px] w-full flex items-center justify-center">
            <span className="text-center text-base font-semibold leading-tight">
            {label}
          </span>
        </div>
      )}
    </Link>
  );
  
};

export default ScenarioButton;
