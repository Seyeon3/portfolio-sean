import { useEffect, useRef, useState } from "react";
import {
  FaPhp,
  FaDatabase,
  FaReact,
  FaJsSquare,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaPaintBrush,
  FaComments,
  FaPuzzlePiece,
  FaBrain,
} from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { motion } from "framer-motion";

export default function Skills() {
  const [progress, setProgress] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const allSkills = [
    {
      name: "PHP",
      level: 80,
      icon: <FaPhp className="text-indigo-400 text-2xl" />,
      desc: "Backend web development.",
    },
    {
      name: "MySQL",
      level: 80,
      icon: <FaDatabase className="text-yellow-400 text-2xl" />,
      desc: "Database design & queries.",
    },
    {
      name: "React Native",
      level: 80,
      icon: <FaReact className="text-cyan-400 text-2xl" />,
      desc: "Cross-platform mobile apps.",
    },
    {
      name: "JavaScript",
      level: 70,
      icon: <FaJsSquare className="text-yellow-300 text-2xl" />,
      desc: "Modern ES6+ interactivity.",
    },
    {
      name: "HTML5",
      level: 90,
      icon: <FaHtml5 className="text-orange-500 text-2xl" />,
      desc: "Semantic web structure.",
    },
    {
      name: "CSS3",
      level: 90,
      icon: <FaCss3Alt className="text-blue-500 text-2xl" />,
      desc: "Responsive & animated UIs.",
    },
    {
      name: "Tailwind CSS",
      level: 75,
      icon: <SiTailwindcss className="text-sky-400 text-2xl" />,
      desc: "Utility-first styling.",
    },
    {
      name: "Node.js",
      level: 78,
      icon: <FaNodeJs className="text-green-500 text-2xl" />,
      desc: "REST APIs & server logic.",
    },
    {
      name: "Graphic Design",
      level: 85,
      icon: <FaPaintBrush className="text-pink-400 text-2xl" />,
      desc: "Creative visuals, layouts & branding.",
    },
    {
      name: "Communication Skills",
      level: 80,
      icon: <FaComments className="text-purple-400 text-2xl" />,
      desc: "Clear idea sharing & teamwork.",
    },
    {
      name: "Problem Solving",
      level: 80,
      icon: <FaPuzzlePiece className="text-emerald-400 text-2xl" />,
      desc: "Creative solutions & debugging.",
    },
    {
      name: "Critical Thinking",
      level: 75,
      icon: <FaBrain className="text-rose-400 text-2xl" />,
      desc: "Logical analysis & decisions.",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const levels = {};
      allSkills.forEach((s) => (levels[s.name] = s.level));
      setProgress(levels);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-start text-white px-4 pt-16 pb-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] animate-gradient-x" />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <motion.div
        className="absolute top-16 left-10 w-24 h-24 border-4 border-cyan-400 rounded-full opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-24 right-16 w-28 h-28 border-4 border-purple-500 rotate-45 opacity-30"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <motion.h2
        className={`relative text-2xl md:text-3xl font-bold mb-8 drop-shadow-[0_0_6px_#3b82f6] transition-all duration-700
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        My Skills
      </motion.h2>

      <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 z-10 max-w-6xl">
        {allSkills.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="bg-white/10 rounded-xl shadow-lg p-4 hover:shadow-cyan-500/30 transition flex flex-col justify-between"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <div className="flex items-center gap-2 mb-2">
              {skill.icon && skill.icon}
              <span className="text-sm font-semibold text-gray-200">
                {skill.name}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-indigo-400 to-cyan-400 h-2 rounded-full shadow-[0_0_8px_#22d3ee]"
                initial={{ width: 0 }}
                animate={{ width: `${progress[skill.name] ?? skill.level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <p className="text-right text-xs text-gray-300 mt-1">
              {progress[skill.name] ?? skill.level}%
            </p>
            <p className="text-gray-400 text-xs mt-2 leading-snug">
              {skill.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 18s ease infinite;
        }
      `}</style>
    </section>
  );
}
