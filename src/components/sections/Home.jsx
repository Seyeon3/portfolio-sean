import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

export const Home = () => {
  const [showResume, setShowResume] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "an aspiring Frontend Developer",
    "a Web Designer",
    "a Tech Enthusiast",
  ];

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 40 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setDisplayedText(currentRole.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayedText(currentRole.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        if (!isDeleting) {
          setTimeout(() => setIsDeleting(true), 1000);
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setCharIndex(0);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setShowResume(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-[#070b1a] font-sans pt-[20px] sm:pt-[40px]"
    >
      {/* Background glowing elements */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <motion.div
          className="absolute top-1/2 left-1/4 w-60 h-60 rounded-full bg-cyan-400 opacity-20 blur-3xl transform -translate-x-1/2 -translate-y-1/2"
          animate={{ y: [0, 50, 0], rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        />
        <motion.div
          className="absolute top-[60%] right-[5%] w-48 h-48 rounded-full bg-blue-500 opacity-20 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Main Hero Content */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-6xl mx-auto px-4 pt-8 pb-16 md:px-6 md:py-20 gap-10 md:gap-0">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col text-center md:text-left md:w-1/2"
        >
          <div className="mb-6">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold text-cyan-400 tracking-wide mb-2"
            >
              Hello!
            </motion.p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
              I'm <span className="text-blue-400">Sean Michael</span>
            </h1>
          </div>

          <div className="mt-4 text-xl sm:text-2xl font-mono font-semibold text-white h-[40px] min-h-[40px]">
            I'm <span>{displayedText}</span>
            <span className="animate-pulse">|</span>
          </div>

          <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-md mx-auto md:mx-0 tracking-wide">
            I am a passionate and dedicated developer, crafting beautiful and
            functional web applications with a focus on seamless user
            experience.
          </p>

          {/* Buttons + Socials */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            {/* View Resume */}
            <button
              onClick={() => setShowResume(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              View Resume
            </button>

            {/* Get in Touch */}
            <a
              href="#contact"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Get in Touch
            </a>

            {/* Social Icons */}
            <div className="flex gap-4 text-2xl text-white">
              <motion.a
                href="https://facebook.com/sean.manaog.7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                whileHover={{ scale: 1.2 }}
              >
                <FaFacebook />
              </motion.a>
              <motion.a
                href="https://github.com/Seyeon3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                whileHover={{ scale: 1.2 }}
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/manaog-sean-michael-998b75325/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.2 }}
              >
                <FaLinkedin />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Avatar */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full md:w-1/2 flex justify-center mt-12 sm:mt-16 md:mt-0 z-10"
        >
          <img
            src="/profile.jpg"
            srcSet="/profile.jpg 1x, /profile@2x.jpg 2x"
            alt="Profile of Sean Michael"
            className="object-cover w-auto max-w-[280px] sm:max-w-[320px] md:max-w-[400px] h-auto rounded-2xl shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Resume Modal */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowResume(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] relative shadow-xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowResume(false)}
                className="absolute top-3 right-3 z-50 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full shadow-lg transition-colors"
              >
                ✕
              </button>
              <iframe
                src="/CV-MANAOG.pdf"
                title="Resume Preview"
                className="w-full h-full rounded-b-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
