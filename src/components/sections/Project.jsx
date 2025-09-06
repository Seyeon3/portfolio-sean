import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectCard = ({ title, description, image, link, type, onPreview }) => (
  <motion.div
    key={title}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.6 }}
    className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-md overflow-hidden 
               group transform transition-all duration-500 flex flex-col w-full max-w-xl mx-auto"
  >
    {/* Image */}
    <div className="relative">
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60"></div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-300 text-sm mb-6">{description}</p>

      {/* Button */}
      <div className="mt-auto">
        <button
          onClick={() => onPreview({ type, link })}
          className="w-full px-4 py-2 rounded-md bg-blue-600 text-base text-white font-medium 
             hover:bg-blue-500 transition-colors duration-300 shadow text-center"
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
    <div className="relative w-full h-full flex items-center justify-center bg-black">
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
        className="absolute left-2 p-2 bg-gray-700/70 hover:bg-gray-600 text-white rounded-full"
      >
        ◀
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => setIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-2 p-2 bg-gray-700/70 hover:bg-gray-600 text-white rounded-full"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-blue-500" : "bg-gray-400"}`}
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
      description:
        "A responsive personal portfolio built with React and Tailwind CSS.",
      image: "/portfolio.jpg",
      link: "https://portfolio-sean.vercel.app/",
      type: "website",
    },
    {
      title: "BerdeVentures Travel Booking",
      description:
        "I developed an online travel agency booking system as a school project.",
      image: "/travel.jpg",
      link: "https://seyeon3.github.io/Travel-Website/",
      type: "website",
    },
    {
      title: "Web-based Property Management System",
      description:
        "Capstone project for managing equipment borrowing and returning with authentication and role-based access. I was the Front-End Developer, our leader managed the Back-End, and other members handled documentation.",
      image: "/login.jpg",
      link: [
        "/login.jpg",
        "/register.jpg",
        "/admin.jpg",
        "/custodians.jpg",
        "/staff.jpg",
      ],
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
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Floating Neon Shapes */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 border-4 border-cyan-400 rounded-full opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 right-16 w-24 h-24 border-4 border-purple-500 rotate-45 opacity-30"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-amber-300 rounded-full"
          style={{
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            opacity: 0.5,
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-10 text-center text-white relative"
        >
          <span className="relative z-10 drop-shadow-[0_0_8px_#3b82f6]">
            My Projects
          </span>
          <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-16 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"></span>
        </motion.h2>

        {/* Carousel Container with Arrows */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={() =>
              setIndex((prev) => (prev === 0 ? projectList.length - 1 : prev - 1))
            }
            className="absolute left-0 p-3 bg-gray-700/70 hover:bg-gray-600 text-white rounded-full"
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
            className="absolute right-0 p-3 bg-gray-700/70 hover:bg-gray-600 text-white rounded-full"
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
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-blue-500" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg w-full max-w-4xl h-[75vh] overflow-hidden shadow-lg flex items-center justify-center">
            <button
              onClick={() => setPreview(null)}
              className="absolute top-3 right-3 z-10 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              ✕
            </button>

            {preview.type === "website" && (
              <iframe
                src={preview.link}
                title="Project Preview"
                className="w-full h-full border-0"
              ></iframe>
            )}

            {preview.type === "image" && (
              <img
                src={preview.link}
                alt="Project Preview"
                className="max-h-full max-w-full object-contain"
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
