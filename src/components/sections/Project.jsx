import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ProjectCard = ({
  title,
  description,
  image,
  link,
  type,
  isVisible,
  index,
  onPreview,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isVisible ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-md overflow-hidden 
               group hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20 
               transform transition-all duration-500"
  >
    <div className="relative">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60"></div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-300 text-sm mb-3">{description}</p>
      <button
        onClick={() => onPreview({ type, link })}
        className="px-3 py-1.5 rounded-md bg-blue-600 text-sm text-white font-medium 
                   hover:bg-blue-500 transition-colors duration-300 shadow"
      >
        View Project
      </button>
    </div>
  </motion.div>
);

export const Project = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [preview, setPreview] = useState(null);
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
      description: "An online travel agency booking system",
      image: "/travel.jpg",
      link: "https://seyeon3.github.io/Travel-Website/",
      type: "website",
    },
    {
      title: "Philippine National Bank",
      description: "An online banking system with admin and user roles",
      image: "/PNB.jpg",
      link: "https://yourblogplatform.com",
      type: "website",
    },
    {
      title: "Vitasoy Fliers",
      description: "I created a flier for Vitasoy using Canva.",
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
    <section id="project" ref={sectionRef} className="relative py-16 overflow-hidden">
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
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-10 text-center text-white relative"
        >
          <span className="relative z-10 drop-shadow-[0_0_8px_#3b82f6]">Projects</span>
          <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-16 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"></span>
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {projectList.map((proj, index) => (
            <ProjectCard
              key={index}
              title={proj.title}
              description={proj.description}
              image={proj.image}
              link={proj.link}
              type={proj.type}
              isVisible={isVisible}
              index={index}
              onPreview={(data) => setPreview(data)}
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

            {preview.type === "website" ? (
              <iframe src={preview.link} title="Project Preview" className="w-full h-full border-0"></iframe>
            ) : (
              <img src={preview.link} alt="Project Preview" className="max-h-full max-w-full object-contain" />
            )}
          </div>
        </div>
      )}

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
