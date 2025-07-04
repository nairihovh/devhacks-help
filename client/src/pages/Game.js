import { useParams } from "react-router-dom";
import { useState } from "react";

// Example data (you can later move this to JSON or API)
const gameContent = {
  earthquake: {
    gameImages: [
      "/images/earthquake.mp4",
      "/images/earthquake.mp4",
    ],
    quiz: [
      {
        question: "Ի՞նչ պետք է անես երկրաշարժի ժամանակ:",
        options: ["Փախչել դրս", "Ծածկվել սեղանի տակ", "Բաց թողնել պատուհանը"],
        correct: 1,
      },
      {
        question: "Ո՞րն է անվտանգ վայրը:",
        options: ["Բաց պատուհանի մոտ", "Սենյակի կենտրոնում", "Ուժեղ սեղանի տակ"],
        correct: 2,
      },
    ],
  },
  bleeding: {
    gameImages: [
        "/images/earthquake.mp4",
        "/images/earthquake.mp4",
    ],
    quiz: [
      {
        question: "Ի՞նչ անել ուժեղ արյունահոսության ժամանակ:",
        options: ["Մաքրել վերքը", "Սեղմել վերքի վրա", "Սառեցնել վերքը"],
        correct: 1,
      },
    ],
  },
};

const Game = () => {
  const { gameName } = useParams();
  const content = gameContent[gameName] || {};
  const { gameImages = [], quiz = [] } = content;

  const [imageIndex, setImageIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const handleNextVideo = () => {
    if (imageIndex < gameImages.length - 1) {
        setImageIndex(imageIndex + 1);
    } else {
        setShowQuiz(true);
    }
  };

  const handleAnswer = (index) => {
      setSelectedAnswer(index)
    if (index === quiz[currentQuestion].correct) {
        setAnswerStatus(true)
        setScore(score + 1);
        alert("Ճիշտ պատասխան")
    }else {
        setAnswerStatus(false)
        alert("Սխալ պատասխան")
    }
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 capitalize">{gameName}</h1>

      {!showQuiz ? (
        <div className="flex flex-col items-center">
          <video
            // key={videos[imageIndex]}
            src={gameImages[imageIndex]}
            // controls
            alt={gameImages[imageIndex]}
            className="w-full max-w-xl rounded-xl shadow-lg mb-4"
          />
          <button
            onClick={handleNextVideo}
            className="bg-yellow-300 text-[#5C1F0C] font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transition"
          >
            Հաջորդը
          </button>
        </div>
      ) : (
        <div className="max-w-xl mx-auto">
          <div className="bg-white/10 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              {quiz[currentQuestion]?.question}
            </h2>
            <div className="space-y-3">
              {quiz[currentQuestion]?.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full text-left bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-lg transition"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
        // 
      )}
      {/* <div className="relative max-w-xl mx-auto"> */}
        {/* Sticker */}
        {/* {answerStatus && (
            <div className={`absolute top-[-100px] left-1/2 -translate-x-1/2 text-3xl font-bold px-6 py-2 rounded-xl shadow-lg 
                ${answerStatus === "correct" ? "bg-green-500 text-white" : "bg-red-500 text-white"} 
                animate-sticker`}>
                {answerStatus === "correct" ? "✅ Ճիշտ!" : "❌ Սխալ"}
            </div>
            )}

            <div className="bg-white/10 p-6 rounded-2xl shadow-xl mt-10">
                <h2 className="text-xl font-semibold mb-4">
                    {quiz[currentQuestion]?.question}
                </h2>
                <div className="space-y-3">
                    {quiz[currentQuestion]?.options.map((opt, i) => {
                        console.log(i)
                    const isSelected = selectedAnswer === i;
                    const isCorrect = quiz[currentQuestion]?.correct === i;

                    let bgColor = "bg-white/20";
                    if (answerStatus && isSelected) {
                        bgColor = answerStatus === "correct" ? "bg-green-600" : "bg-red-600";
                    }

                    return (
                        <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={answerStatus !== null}
                        className={`w-full text-left ${bgColor} text-white px-4 py-3 rounded-lg transition duration-300 hover:bg-white/30`}
                        >
                        {opt}
                        </button>
                    );
                    })} */}
                {/* </div> */}
            {/* </div> */}
        {/* </div> */}
    </>
  );
};

export default Game;
