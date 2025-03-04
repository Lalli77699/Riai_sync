import { FaBars, FaUserCircle, FaBell } from "react-icons/fa";

const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-md flex items-center justify-between px-6 py-4 z-50 rounded-xl">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img
          src="https://www.riaisolutions.com/wp-content/uploads/2020/10/RiAiSolutions_Logo_304x91.png"
          alt="RiAi Solutions Logo"
          className="h-10"
        />

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