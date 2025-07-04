import useTelegram from "../hooks/useTelegram";

const Header = () => {
  const { tgUser } = useTelegram();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 
      bg-gradient-to-br from-[#a63c07] via-[#5C1F0C] to-[#a63c07] 
      bg-[length:200%_200%] animate-gradient-x
      fixed
      flex justify-around py-3 px-6 rounded-b-3xl shadow-[0_-8px_20px_rgba(0,0,0,0.4)] backdrop-blur-md">
            {/* Logo (left) */}
            <div className="flex items-center gap-2">
                <img
                src="/images/logo.png"
                alt="Logo"
                className="w-14 h-14 object-contain rounded-full"
                />
                <span className="text-xl font-bold text-white font-soul">Study Survive</span>
            </div>

            {/* User name (right) */}
            {/* {tgUser && ( */}
                {/* <div className="flex items-center gap-2"> */}
                {/* <span className="text-sm text-white">{tgUser.first_name}</span> */}
                {/* <img
                    src={tgUser.photo_url}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-white"
                />
                </div> */}
            {/* )} */}
        </header>
    )
}

export default Header;