import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center text-white px-6 overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] animate-gradient-x"></div>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Floating Neon Shapes */}
      <motion.div
        className="absolute top-10 left-10 w-28 h-28 border-4 border-cyan-400 rounded-full opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 right-16 w-32 h-32 border-4 border-purple-500 rotate-45 opacity-30"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-amber-300 rounded-full"
          style={{
            width: Math.random() * 5 + 3 + "px",
            height: Math.random() * 5 + 3 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            opacity: 0.5,
          }}
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        className={`relative max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 transition-all duration-1000 ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Profile Image */}
        <div className="flex-shrink-0 group">
          <img
            src="/Manaog.jpg"
            alt="Profile"
            className="w-52 h-52 md:w-72 md:h-72 rounded-full border-4 border-blue-500 shadow-md object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* About Text */}
        <div>
          <h2 className="text-4xl font-bold mb-6 relative inline-block drop-shadow-[0_0_10px_#3b82f6]">
            About Me
            <span className="absolute left-0 -bottom-1 w-16 h-1 bg-blue-500 rounded shadow-[0_0_10px_#3b82f6]"></span>
          </h2>

          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Hi! I’m <span className="font-semibold text-white">Sean Michael Manaog</span>, 22 years old, and a fresh graduate of Global Reciprocal Colleges with a Bachelor of Science in Information Technology.  
            I have a solid background in both computer hardware and software, and I’m passionate about building dynamic and responsive web applications.
          </p>

          <p className="text-lg leading-relaxed text-gray-300">
            What started as a simple fascination with how websites work has grown into a deeper drive to master the technologies that bring them to life.  
            I’m committed to lifelong learning, always exploring new tools and techniques to create better solutions and deliver meaningful user experiences.
          </p>

          <div className="mt-8 h-0.5 bg-blue-500 opacity-50 rounded-full"></div>
        </div>
      </motion.div>

      {/* Background animation keyframes */}
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
};
