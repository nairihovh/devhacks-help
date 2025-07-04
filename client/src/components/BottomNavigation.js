import { FaGamepad, FaHome, FaMap, FaUser, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname.split('/')[1] === path || path === "/" && location.pathname.split('/')[1] === "";
  console.log(location.pathname.split('/')[1])

  const baseClass = "flex flex-col items-center text-xs transition-all duration-200";
  const activeClass = "text-yellow-300 scale-110 font-semibold";
  const inactiveClass = "text-white opacity-70 hover:opacity-100";

  const iconBase = "text-xl mb-1 p-2 rounded-full";
  const iconActive = "bg-yellow-100 bg-opacity-20 shadow-lg";
  const iconInactive = "bg-white bg-opacity-10 hover:bg-opacity-20";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 
      bg-gradient-to-br from-[#a63c07] via-[#5C1F0C] to-[#a63c07] 
      bg-[length:200%_200%] animate-gradient-x
      flex justify-around py-3 px-6 rounded-t-3xl shadow-[0_-8px_20px_rgba(0,0,0,0.4)] backdrop-blur-md">
      <Link to="/" className={`${baseClass} ${isActive("/") ? activeClass : inactiveClass}`}>
        <div className={`${iconBase} ${isActive("/") ? iconActive : iconInactive}`}>
          <FaHome />
        </div>
        Գլխավոր
      </Link>

      <Link to="/game" className={`${baseClass} ${isActive("game") ? activeClass : inactiveClass}`}>
        <div className={`${iconBase} ${isActive("game") ? iconActive : iconInactive}`}>
          <FaGamepad />
        </div>
        Խաղալ
      </Link>

      <Link to="/map" className={`${baseClass} ${isActive("map") ? activeClass : inactiveClass}`}>
        <div className={`${iconBase} ${isActive("map") ? iconActive : iconInactive}`}>
          <FaMap />
        </div>
        Քարտեզ
      </Link>

      <Link to="/team" className={`${baseClass} ${isActive("team") ? activeClass : inactiveClass}`}>
        <div className={`${iconBase} ${isActive("team") ? iconActive : iconInactive}`}>
          <FaUsers />
        </div>
        Իմ թիմը
      </Link>

      <Link to="/profile" className={`${baseClass} ${isActive("profile") ? activeClass : inactiveClass}`}>
        <div className={`${iconBase} ${isActive("profile") ? iconActive : iconInactive}`}>
          <FaUser />
        </div>
        Պրոֆիլ
      </Link>
    </div>
  );
};

export default BottomNavigation;
