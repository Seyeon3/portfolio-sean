import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectCard = ({ title, description, image, link, type, onPreview }) => (
  <motion.div
    key={title}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.6 }}
    className="bg-white/10 backdrop-blur-lg border border-white/20 
               rounded-2xl shadow-lg overflow-hidden group transform 
               transition-all duration-500 flex flex-col w-full max-w-xl mx-auto"
  >
    {/* Image */}
    <div className="relative">
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-200 text-sm mb-6">{description}</p>

      {/* Button */}
      <div className="mt-auto">
        <button
          onClick={() => onPreview({ type, link })}
          className="w-full px-4 py-2 rounded-lg bg-blue-600/80 text-base text-white font-medium 
             hover:bg-blue-500/80 transition-colors duration-300 shadow-md text-center backdrop-blur-md"
        >
          View Project
        </button>
      </div>
    </div>
  </motion.div>
);

// Inner image carousel
const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-lg rounded-xl border border-white/20">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`Slide ${index}`}
          className="max-h-full max-w-full object-contain rounded-md shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* Left Arrow */}
      <button
        onClick={() => setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
        className="absolute left-2 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md"
      >
        ◀
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => setIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-2 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-blue-400" : "bg-gray-400/60"}`}
          />
        ))}
      </div>
    </div>
  );
};

export const Project = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [preview, setPreview] = useState(null);
  const [index, setIndex] = useState(0);
  const sectionRef = useRef(null);

  const projectList = [
    {
      title: "Portfolio Website",
      description: "A responsive personal portfolio built with React and Tailwind CSS.",
      image: "/portfolio.jpg",
      link: "https://portfolio-sean.vercel.app/",
      type: "website",
    },
    {
      title: "BerdeVentures Travel Booking",
      description: "I developed an online travel agency booking system as a school project.",
      image: "/travel.jpg",
      link: "https://seyeon3.github.io/Travel-Website/",
      type: "website",
    },
    {
      title: "Web-based Property Management System",
      description:
        "Capstone project for managing equipment borrowing and returning with authentication and role-based access.",
      image: "/login.jpg",
      link: ["/login.jpg", "/register.jpg", "/admin.jpg", "/custodians.jpg", "/staff.jpg"],
      type: "carousel",
    },
    {
      title: "Vitasoy Fliers",
      description: "A marketing flier for Vitasoy created using Canva.",
      image: "/vitasoy.jpg",
      link: "/vitasoy.jpg",
      type: "image",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
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
      id="project"
      ref={sectionRef}
      className="relative py-16 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] animate-gradient-x"></div>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xl"></div>

      {/* Floating Neon Shapes */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 border-4 border-cyan-400/40 rounded-full opacity-40"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 right-16 w-24 h-24 border-4 border-purple-500/40 rotate-45 opacity-40"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-10 text-center text-white relative drop-shadow-lg"
        >
          <span className="relative z-10">My Projects</span>
          <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-16 h-1 bg-blue-500 rounded-full shadow-lg"></span>
        </motion.h2>

        {/* Carousel Container with Arrows */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={() => setIndex((prev) => (prev === 0 ? projectList.length - 1 : prev - 1))}
            className="absolute left-0 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md"
          >
            ◀
          </button>

          <AnimatePresence mode="wait">
            <ProjectCard
              key={projectList[index].title}
              title={projectList[index].title}
              description={projectList[index].description}
              image={projectList[index].image}
              link={projectList[index].link}
              type={projectList[index].type}
              onPreview={(data) => setPreview(data)}
            />
          </AnimatePresence>

          {/* Right Arrow */}
          <button
            onClick={() => setIndex((prev) => (prev + 1) % projectList.length)}
            className="absolute right-0 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md"
          >
            ▶
          </button>
        </div>

        {/* Dots below */}
        <div className="flex justify-center mt-6 gap-2">
          {projectList.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${i === index ? "bg-blue-400" : "bg-gray-400/60"}`}
            />
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 
                          rounded-2xl w-full max-w-4xl h-[75vh] overflow-hidden 
                          shadow-2xl flex items-center justify-center">
            <button
              onClick={() => setPreview(null)}
              className="absolute top-3 right-3 z-10 px-3 py-1 bg-red-500/80 hover:bg-red-600 text-white rounded-md shadow"
            >
              ✕
            </button>

            {preview.type === "website" && (
              <iframe
                src={preview.link}
                title="Project Preview"
                className="w-full h-full border-0 rounded-xl"
              ></iframe>
            )}

            {preview.type === "image" && (
              <img
                src={preview.link}
                alt="Project Preview"
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            )}

            {preview.type === "carousel" && <Carousel images={preview.link} />}
          </div>
        </div>
      )}

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
