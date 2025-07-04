import { FaUserFriends, FaTelegramPlane } from "react-icons/fa";

const teamMembers = [
  {
    name: "Անի Մարգարյան",
    role: "Փրկարար",
    avatar: "/images/avatar1.png",
    telegram: "https://t.me/anirescue"
  },
  {
    name: "Տիգրան Սարգսյան",
    role: "Բուժօգնության մասնագետ",
    avatar: "/images/avatar2.png",
    telegram: "https://t.me/tigranmedic"
  },
  {
    name: "Լիլիթ Արամյան",
    role: "Աղետների վերլուծաբան",
    avatar: "/images/avatar3.png",
    telegram: "https://t.me/lilitanalyst"
  }
];

const Friends = () => {
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6">Իմ Թիմը</h1>

      <div className="space-y-4 max-w-xl mx-auto">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-4">
              <img
                src="/images/logo.png"
                // src={member.avatar}
                alt={member.name}
                className="w-14 h-14 rounded-full border-2 border-white"
              />
              <div>
                <h2 className="text-lg font-semibold">{member.name}</h2>
                <p className="text-sm opacity-80">{member.role}</p>
              </div>
            </div>
            <a
              href={member.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-300 hover:bg-yellow-400 text-[#5C1F0C] p-2 rounded-full"
            >
              <FaTelegramPlane />
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Friends;
