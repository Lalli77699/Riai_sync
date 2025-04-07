import { useState, useRef, useEffect } from "react";
import { FaBars, FaUserCircle, FaBell } from "react-icons/fa";
import reactLogo from "./react.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
const navigate=useNavigate()
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full h-full bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg flex items-center justify-between px-6 py-4 z-50 rounded-xl border-b-4 border-indigo-900 relative">
      <div className="flex items-center space-x-3">
        <img src={reactLogo} className="h-8" alt="React Logo" />
        <span className="text-white text-lg font-semibold">RIAI Sync</span>
      </div>

      <div className="flex items-center space-x-6 text-white relative">
        <FaBell size={24} className="cursor-pointer hover:text-gray-300 transition duration-300" />
        
        <div className="relative" ref={dropdownRef}>
          <FaUserCircle 
            size={26} 
            className="cursor-pointer hover:text-gray-300 transition duration-300"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => navigate('/profile')}>My Profile</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={()=>{
                sessionStorage.removeItem('auth')
                navigate('/')
              }}>Logout</button>
            </div>
          )}
        </div>

        <FaBars size={26} className="md:hidden cursor-pointer hover:text-gray-300 transition duration-300" />
      </div>
    </header>
  );
};

export default Header;
