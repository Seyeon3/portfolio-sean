
import logo from "../assets/logo.jpg"; // ✅ replace with your actual logo path

export const Footer = () => {
  return (
    <footer className="bg-black text-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center space-y-6">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 object-contain rounded-full border-2 border-gray-700 hover:scale-110 transition-transform duration-300"
          />
          <span className="text-xl font-bold tracking-wide">
            Sean<b className="text-blue-500">.dev</b>
          </span>
        </div>


        {/* Copyright */}
        <p className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Sean Michael Manaog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
