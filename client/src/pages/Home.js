// src/components/Header.jsx
import ScenarioButton from "../components/ScenarioButton";
import useTelegram from "../hooks/useTelegram";

const Home = () => {
  const { tgUser } = useTelegram();

  return (
    <>
        <ScenarioButton
            // label="Տագնապի պայուսակ"
            to="/alarm"
            image="/images/tagnap-bag.png"
        />
    </>
  );
};

export default Home;
