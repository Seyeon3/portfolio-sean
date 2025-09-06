import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [fade, setFade] = useState("opacity-0"); // start hidden
  const [progress, setProgress] = useState(0); // percentage
  const fullText = "Loading...";

  useEffect(() => {
    // fade in on mount
    setTimeout(() => setFade("opacity-100"), 200);

    // percentage + progress bar
    let percentage = 0;
    const progressInterval = setInterval(() => {
      percentage += 2;
      if (percentage > 100) percentage = 100;
      setProgress(percentage);

      if (percentage === 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setFade("opacity-0"); // fade out
          setTimeout(onComplete, 1500); // wait until fade-out finished
        }, 800);
      }
    }, 80);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  // derive loading text from progress
  const lettersToShow = Math.floor((progress / 100) * fullText.length);
  const text = fullText.substring(0, lettersToShow);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden transition-opacity duration-[1500ms] ease-in-out ${fade}`}
    >
      {/* Robot GIF */}
      <div className="relative flex flex-col items-center mb-8">
        <img
          src="/robot.gif"
          alt="Loading Robot"
          className="w-60 h-60 object-contain"
        />
      </div>

      {/* Typing Text (synced with progress) */}
      <div className="text-3xl font-mono font-bold text-white flex items-center tracking-widest mb-6">
        {text}
        <span className="ml-1 animate-blink">|</span>
      </div>

      {/* Loading Bar with Percentage Inside */}
      <div className="w-64 h-6 bg-gray-900 border-2 border-blue-500 rounded relative overflow-hidden flex items-center">
        {/* Progress Fill */}
        <div
          className="h-full bg-blue-500 transition-all duration-200 flex items-center justify-center"
          style={{ width: `${progress}%` }}
        >
          <span className="text-xs font-bold text-white">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};
