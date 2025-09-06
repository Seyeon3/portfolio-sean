import { useEffect } from "react";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const menuItems = [
    { name: "Home", href: "#home", delay: "delay-200" },
    { name: "About", href: "#about", delay: "delay-400" },
    { name: "Skills", href: "#skills", delay: "delay-500" },
    { name: "Project", href: "#project", delay: "delay-600" },
    { name: "Certifications", href: "#certificates", delay: "delay-700" },
    { name: "Contact", href: "#contact", delay: "delay-800" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen z-40 flex flex-col items-center justify-center bg-[rgba(10,10,10,0.8)] 
        transition-all duration-700 ease-in-out transform
        ${
          menuOpen
            ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
            : "-translate-y-full opacity-0 scale-95 pointer-events-none"
        }`}
    >
      {/* Animated Hamburger (Close) */}
      <div
        className="absolute top-6 right-6 w-8 h-8 flex flex-col justify-center items-center gap-[6px] cursor-pointer z-50"
        onClick={() => setMenuOpen(false)}
      >
        <span
          className={`block w-6 h-[2px] bg-white rounded transition-all duration-500 ease-in-out ${
            menuOpen ? "rotate-45 translate-y-[8px]" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-[2px] bg-white rounded transition-all duration-500 ease-in-out ${
            menuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-[2px] bg-white rounded transition-all duration-500 ease-in-out ${
            menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
          }`}
        ></span>
      </div>

      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <a
          key={index}
          href={item.href}
          onClick={() => setMenuOpen(false)}
          className={`relative text-white text-2xl mb-6 transition-all duration-700 transform 
            ${menuOpen ? `opacity-100 translate-y-0 ${item.delay}` : "opacity-0 translate-y-5"}
            after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-blue-500 
            after:transition-all after:duration-300 hover:after:w-full`}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};
