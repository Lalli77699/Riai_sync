import { FaBars, FaUserCircle, FaBell } from "react-icons/fa";
import reactLogo from './react.png';

const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg flex items-center justify-between px-6 py-4 z-50 rounded-xl border-b-4 border-indigo-900">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img
          src={reactLogo}
          className="h-8"
        />
        <span className="text-white text-lg font-semibold">RIAI Sync</span>
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-6 text-white">
        <FaBell size={24} className="cursor-pointer hover:text-gray-300 transition duration-300" />
        <FaUserCircle size={26} className="cursor-pointer hover:text-gray-300 transition duration-300" />
        {/* Mobile Menu Icon */}
        <FaBars size={26} className="md:hidden cursor-pointer hover:text-gray-300 transition duration-300" />
      </div>
    </header>
  );
};

export default Header;