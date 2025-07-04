import { FaGamepad, FaHome, FaMap, FaUser, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname.split('/')[1] === path || path === "/" && location.pathname.split('/')[1] === "";

  const baseClass = "flex flex-col items-center text-xs transition-all duration-200";
  const activeClass = "text-yellow-300 scale-120 font-semibold";
  const inactiveClass = "text-white opacity-70 hover:opacity-100";

  const iconBase = "text-xl mb-0 p-2 rounded-full";
  const iconActive = "bg-yellow-100 bg-opacity-90 shadow-lg";
  const iconInactive = "hover:bg-opacity-10";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 
      bg-gradient-to-br from-[#a63c07] via-[#5C1F0C] to-[#a63c07] 
      bg-[length:200%_200%] animate-gradient-x
      flex justify-around py-3 px-6 rounded-t-3xl shadow-[0_-8px_20px_rgba(0,0,0,0.4)] backdrop-blur-md">
      <Link to="/" className={`${baseClass} ${isActive("/") ? activeClass : inactiveClass}`}>
        <div className={`${iconBase} ${isActive("/") ? iconActive : iconInactive}`}>
          <img src="/images/home.png" alt="Home" className="w-9 h-9" />
        </div>
        {/* Գլխավոր */}
      </Link>

      <Link to="/games" className={`${baseClass} ${isActive("games") ? activeClass : inactiveClass}`}>
        <div className={`${iconBase} ${isActive("games") ? iconActive : iconInactive}`}>
          <img src="/images/game.png" alt="Home" className="w-9 h-9" />
          {/* <FaGamepad /> */}
          
        </div>
        {/* Խաղալ */}
      </Link>

      <Link to="/map" className={`${baseClass} ${isActive("map") ? activeClass : inactiveClass}`}>
        <div className={`${iconBase} ${isActive("map") ? iconActive : iconInactive}`}>
          <img src="/images/map.png" alt="Home" className="w-9 h-9" />
          {/* <FaMap /> */}
        </div>
        {/* Քարտեզ */}
      </Link>

      <Link to="/team" className={`${baseClass} ${isActive("team") ? activeClass : inactiveClass}`}>
        <div className={`${iconBase} ${isActive("team") ? iconActive : iconInactive}`}>
          {/* <FaUsers /> */}
          <img src="/images/team.png" alt="Home" className="w-9 h-9" />
        </div>
        {/* Իմ թիմը */}
      </Link>

      <Link to="/profile" className={`${baseClass} ${isActive("profile") ? activeClass : inactiveClass}`}>
        <div className={`${iconBase} ${isActive("profile") ? iconActive : iconInactive}`}>
          {/* <FaUser /> */}
          <img src="/images/profile.png" alt="Home" className="w-9 h-9" />
        </div>
        {/* Պրոֆիլ */}
      </Link>
    </div>
  );
};

export default BottomNavigation;
