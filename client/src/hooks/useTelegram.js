import { useEffect, useState } from "react";

const useTelegram = () => {
  const [tgUser, setTgUser] = useState(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      setTgUser(user);
    }
  }, []);

  return { tgUser };
};


export default useTelegram;