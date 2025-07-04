import { FaGamepad, FaHome, FaMap, FaQuestionCircle, FaUser, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const baseClass = "flex flex-col items-center transition-all duration-200";
  const activeClass = "text-yellow-300 scale-110";
  const inactiveClass = "text-white opacity-70 hover:opacity-100";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#5C1F0C] flex justify-around py-3 px-6 rounded-t-3xl shadow-inner text-xs z-50">
      <Link to="/" className={`${baseClass} ${isActive("/") ? activeClass : inactiveClass}`}>
        <FaHome className="text-xl mb-1" />
        Գլխավոր
      </Link>
      <Link to="/game" className={`${baseClass} ${isActive("/game") ? activeClass : inactiveClass}`}>
        <FaGamepad className="text-xl mb-1" />
        Խաղալ
      </Link>
      {/* <Link to="/quiz" className={`${baseClass} ${isActive("/quiz") ? activeClass : inactiveClass}`}>
        <FaQuestionCircle className="text-xl mb-1" />
        Քուիզ
      </Link> */}
      <Link to="/map" className={`${baseClass} ${isActive("/map") ? activeClass : inactiveClass}`}>
        <FaMap className="text-xl mb-1" />
        Քարտեզ
      </Link>
      <Link to="/team" className={`${baseClass} ${isActive("/team") ? activeClass : inactiveClass}`}>
        <FaUsers className="text-xl mb-1" />
        Իմ թիմը
      </Link>
      <Link to="/profile" className={`${baseClass} ${isActive("/profile") ? activeClass : inactiveClass}`}>
        <FaUser className="text-xl mb-1" />
        Պրոֆիլ
      </Link>
    </div>
  );
};

export default BottomNavigation;
