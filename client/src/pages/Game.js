import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const gameContent = {
  earthqueake: {
    gameImages: ["/images/earthquake.mp4"],
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
    gameImages: ["/images/earthquake.mp4"],
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
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [loadedSounds, setLoadedSounds] = useState(false);


  const [imageIndex, setImageIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [videosAreEnded, setVideosAreEnded] = useState(false);

  const handleNextVideo = () => {
    if (imageIndex < gameImages.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      setVideosAreEnded(true);
    }
  };

  useEffect(() => {
    const correctSound = new Audio("/sounds/success.mp3");
    const wrongSound = new Audio("/sounds/wrong.mp3");
  
    Promise.all([
      new Promise((res) => correctSound.addEventListener("canplaythrough", res, { once: true })),
      new Promise((res) => wrongSound.addEventListener("canplaythrough", res, { once: true })),
    ]).then(() => {
      setLoadedSounds(true);
    });
  }, []);
  useEffect(() => {
    if (loadedVideos >= gameImages.length && loadedSounds) {
      setAssetsLoaded(true);
    }
  }, [loadedVideos, loadedSounds, gameImages.length]);
  

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    const isCorrect = index === quiz[currentQuestion].correct;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      const correctSound = new Audio("/sounds/success.mp3");
      correctSound.play();
    }else {
      const correctSound = new Audio("/sounds/wrong.mp3");
      correctSound.play();
    }
    setAnswerStatus(isCorrect);
  
    setTimeout(() => {
      setAnswerStatus(null);
      setSelectedAnswer(null);
      if (currentQuestion < quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowQuiz(false);
      }
    }, 3000);
  };
  

  return (
    <>
      {assetsLoaded ? (
          <></>
      ) : (
        <div className="text-white text-xl text-center py-20">Բեռնվում է...</div>
      )}
      <div className="w-full max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-extrabold text-white text-center capitalize mb-6">
        {gameName}
      </h1>

      {!showQuiz ? (
        <div className="w-full flex flex-col items-center relative">
          {videosAreEnded && (
            <button
              onClick={() => setShowQuiz(true)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              bg-yellow-300 text-[#5C1F0C] text-2xl font-extrabold px-8 py-4 
              rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] 
              hover:bg-yellow-400 hover:scale-105 transition-all duration-300 z-10 backdrop-blur-sm"
            >
              Սկսել Հարցումը
            </button>
          )}

          <div className={`w-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${videosAreEnded ? "blur-sm scale-[0.98]" : ""}`}>
            <video
              key={gameImages[imageIndex]}
              src={gameImages[imageIndex]}
              autoPlay
              onEnded={handleNextVideo}
              onLoadedData={() => {
                setLoadedVideos((prev) => prev + 1)
              }}
              className="w-full h-[300px] object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="relative bg-white/10 p-6 rounded-2xl shadow-2xl backdrop-blur-sm text-white">
          {answerStatus !== null && (
            <div
              className={`absolute -top-12 left-1/2 -translate-x-1/2 text-xl font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-500 animate-pulse
              `}
            >
              {answerStatus ? <>
              <img
                src="/images/success.png"
                alt="success"
              />
              </> : <>
              <img
                src="/images/wrong-answer.png"
                alt="wrong"
              />
              </>}
            </div>
          )}

          <h2 className="text-xl font-semibold mb-4">
            {quiz[currentQuestion]?.question}
          </h2>

          <div className="space-y-3">
            {quiz[currentQuestion]?.options.map((opt, i) => {
              const isSelected = selectedAnswer === i;
              const isCorrect = quiz[currentQuestion]?.correct === i;

              let bgColor = "bg-white/20 hover:bg-white/30";
              if (answerStatus !== null && isSelected) {
                bgColor = answerStatus ? "bg-green-500" : "bg-red-500";
              } else if (answerStatus !== null && isCorrect) {
                bgColor = "bg-green-600";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={answerStatus !== null}
                  className={`w-full text-left ${bgColor} text-white px-4 py-3 rounded-lg transition duration-300`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
    
    </>
  );
};

export default Game;
