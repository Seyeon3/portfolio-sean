import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const fullText = "Loading...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Robot GIF */}
      <div className="relative flex flex-col items-center mb-8">
        <img 
          src="/robot.gif"  // 👉 replace with your actual gif path
          alt="Loading Robot"
          className="w-60 h-60 object-contain"  // bigger size, no glow
        />
      </div>

      {/* Typing Text */}
      <div className="text-3xl font-mono font-bold text-white flex items-center tracking-widest mb-6">
        {text}
        <span className="ml-1 animate-blink">|</span>
      </div>

      {/* Loading Bar */}
      <div className="w-64 h-3 bg-gray-900 border-2 border-blue-500 rounded relative overflow-hidden">
        <div className="w-[40%] h-full bg-blue-500 animate-loading-bar"></div>
      </div>
    </div>
  );
};
