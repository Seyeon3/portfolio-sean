import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({ onComplete }) => {
  const [fade, setFade] = useState("opacity-0"); 
  const [progress, setProgress] = useState(0); 
  const fullText = "Loading...";

  useEffect(() => {
    setTimeout(() => setFade("opacity-100"), 200);

    let percentage = 0;
    const progressInterval = setInterval(() => {
      percentage += 2;
      if (percentage > 100) percentage = 100;
      setProgress(percentage);

      if (percentage === 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setFade("opacity-0");
          setTimeout(onComplete, 1500);
        }, 800);
      }
    }, 80);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  // Sync text with progress
  const lettersToShow = Math.floor((progress / 100) * fullText.length);
  const text = fullText.substring(0, lettersToShow);

  return (
    <div
      className={`fixed inset-0 z-50 bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center justify-center overflow-hidden transition-opacity duration-[1500ms] ease-in-out ${fade}`}
    >
      {/* Robot with floating animation */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative flex flex-col items-center mb-10"
      >
        <img
          src="/robot.gif"
          alt="Loading Robot"
          className="w-52 h-52 object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]"
        />
      </motion.div>

      {/* Typing Text synced with progress */}
      <div className="text-3xl font-mono font-bold text-blue-400 flex items-center tracking-widest mb-8">
        {text.split("").map((char, i) => (
          <AnimatePresence key={i}>
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
            >
              {char}
            </motion.span>
          </AnimatePresence>
        ))}
        <span className="ml-1 animate-blink text-white">|</span>
      </div>

      {/* Progress Bar */}
      <div className="w-72 h-6 bg-gray-800 border-2 border-blue-500 rounded-full relative overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.5)]">
        {/* Progress Fill */}
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center"
          style={{ width: `${progress}%` }}
          animate={{ boxShadow: "0 0 15px rgba(59,130,246,0.7)" }}
          transition={{ duration: 0.3 }}
        >
          <span
            className={`text-xs font-bold transition-colors duration-300 ${
              progress < 50 ? "text-blue-900" : "text-white"
            }`}
          >
            {progress}%
          </span>
        </motion.div>
      </div>
    </div>
  );
};
