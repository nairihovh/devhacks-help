import { Link } from "react-router-dom";
import ScenarioButton from "../components/ScenarioButton"

const Games = () => {
  return (
    <>
        <div className="text-center mt-6">
            <h1 className="text-3xl font-bold mb-2">Խաղային սցենարներ</h1>
            <p className="text-white/70">Ընտրիր իրավիճակը և սկսիր գործել</p>
        </div>
        <div className="flex flex-row gap-4 mt-6 justify-center flex-wrap">
            <ScenarioButton
                to={"/game/bleeding"}
                label="🔥 Հրդեհ"
                cover={true}
                bgColor="bg-red-100"
                image="/images/fire.png"
            />
            <ScenarioButton
                to={"/game/earthqueake"}
                label="🌍 Երկրաշարժ"
                bgColor="bg-red-100"
                image="/images/earthquake-poster.png"
            />
        </div>
    </>
  );
};

export default Games;
