// src/components/Header.jsx
import ScenarioButton from "../components/ScenarioButton";
import useTelegram from "../hooks/useTelegram";

const Home = () => {
  const { tgUser } = useTelegram();

  return (
    <>
      <div className="flex flex-row gap-4 mt-6 justify-center flex-wrap">
        <ScenarioButton
            // label="Տագնապի պայուսակ"
            to="/alarm"
            image="/images/tagnap-bag.png"
        />

        <ScenarioButton
            // label="Պարագաների հաշուիչ"
            to="/Calculator_of_survival"
            image="/images/calculator.png"
        />
      </div>
    </>
  );
};

export default Home;
