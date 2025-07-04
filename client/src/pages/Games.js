import { Link } from "react-router-dom";
import ScenarioButton from "../components/ScenarioButton"

const Games = () => {
  return (
    <>
        <div className="flex flex-row gap-4 mt-6 justify-center flex-wrap">
        <div className="text-center mt-6">
            <h1 className="text-3xl font-bold mb-2">Խաղային սցենարներ</h1>
            <p className="text-white/70">Ընտրիր իրավիճակը և սկսիր գործել</p>
        </div>
            <ScenarioButton
                to={"/game/bleeding"}
                label="🩸 Արյունահոսություն"
                bgColor="bg-red-100"
            />
            <ScenarioButton
                to={"/game/earthqueake"}
                label="🌍 Երկրաշարժ"
                bgColor="bg-red-100"
            />

            {/* <Link to="/game/bleeding" className="w-[160px] h-[200px] bg-red-100 text-[#5C1F0C] rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center p-4">
            <img
                src="/images/bleeding.png"
                alt="Bleeding"
                className="w-20 h-20 object-contain mb-3"
            />
            <span className="text-center text-lg font-semibold">🩸 Արյունահոսություն</span>
            </Link> */}
        </div>

    </>
  );
};

export default Games;
