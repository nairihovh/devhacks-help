import useTelegram from "../hooks/useTelegram";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useNavigationType } from "react-router-dom";

const Header = () => {
  const { tgUser } = useTelegram();
  const navigate = useNavigate();
  const navigationType = useNavigationType(); // 'PUSH', 'POP', or 'REPLACE'

  const canGoBack = navigationType !== "POP";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 
          bg-gradient-to-br from-[#a63c07] via-[#5C1F0C] to-[#a63c07] 
          bg-[length:200%_200%] animate-gradient-x
          fixed
          flex justify-around py-3 px-6 rounded-b-3xl shadow-[0_-8px_20px_rgba(0,0,0,0.4)] backdrop-blur-md">
            {canGoBack && (
          <button
            onClick={() => navigate(-1)}
            className="flex fixed left-1 top-5 items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition shadow-md"
          >
            <FaArrowLeft />
            <span className="font-medium hidden sm:inline">Վերադառնալ</span>
          </button>
        )}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white font-soul">Study</span>
            <img
            src="/images/logo.png"
            alt="Logo"
            className="w-14 h-14 object-contain"
            />
          <span className="text-xl font-bold text-white font-soul">Survive</span>
        </div>
      </header>
    </>

  );
};

export default Header;
