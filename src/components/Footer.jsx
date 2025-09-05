import { FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export const Footer = () => {
  return (
    <footer className="bg-black text-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center space-y-4">
        {/* Social Links */}
        <div className="flex space-x-6">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/manaog-sean-michael-998b75325/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaLinkedin size={28} />
          </a>

          {/* Gmail */}
          <a
            href="mailto:seanmanaog22@gmail.com"
            className="hover:text-red-400 transition-colors"
          >
            <SiGmail size={28} />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Seyeon3"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            <FaGithub size={28} />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/sean.manaog.7"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            <FaFacebook size={28} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Sean Michael Manaog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
