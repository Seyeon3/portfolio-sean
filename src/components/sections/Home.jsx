import { useState } from "react";
import { motion } from "framer-motion";

export const Home = () => {
  const [showResume, setShowResume] = useState(false);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 relative"
    >
      <div className="max-w-3xl text-center">
        {/* Hero Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Hello, I’m <span className="text-blue-500">Sean Michael</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg text-gray-300"
        >
          "A passionate web developer, and tech enthusiast."
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* View Resume (opens iframe modal) */}
          <button
            onClick={() => setShowResume(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded font-medium transition-all duration-200"
          >
            View Resume
          </button>

          {/* Contact Me Button */}
          <a
            href="#contact"
            className="border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium transition-all duration-200
              hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:bg-blue-500/10"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Resume Preview Modal */}
      {showResume && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl md:max-w-4xl h-[80vh] sm:h-[85vh] relative shadow-lg flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setShowResume(false)}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              ✕
            </button>

            {/* Iframe Preview */}
            <iframe
              src="/CV-MANAOG.pdf"
              title="Resume Preview"
              className="w-full h-full rounded-b-lg"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};
