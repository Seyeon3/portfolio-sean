import { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: "-60px 0px -40% 0px",
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  const handleClick = (href) => {
    setActiveSection(href);
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg transition-all duration-500 ease-in-out">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3" onClick={() => handleClick("#home")}>
            <img
              src={logo}
              alt="Logo"
              className="h-9 w-9 rounded-full object-cover border border-white/20 hover:scale-110 transition-transform duration-300"
            />
            <span className="font-mono text-xl font-bold text-white">Sean
              <b className="text-blue-500">.dev</b>
            </span>
          </a>

          {/* Hamburger Icon */}
          <div
            className="w-8 h-8 flex flex-col justify-center items-center gap-[6px] cursor-pointer z-50 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className={`block w-6 h-[2px] bg-white rounded transition-all duration-500 ease-in-out ${menuOpen ? "rotate-45 translate-y-[8px]" : ""}`}></span>
            <span className={`block w-6 h-[2px] bg-white rounded transition-all duration-500 ease-in-out ${menuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-[2px] bg-white rounded transition-all duration-500 ease-in-out ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}></span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: "Home", href: "#home" },
              { name: "About", href: "#about" },
              { name: "Skills", href: "#skills" },
              { name: "Project", href: "#project" },
              { name: "Certifications", href: "#certificates" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleClick(link.href)}
                className={`relative text-gray-300 hover:text-white transition-colors after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full ${
                  activeSection === link.href ? "text-white after:w-full" : ""
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
