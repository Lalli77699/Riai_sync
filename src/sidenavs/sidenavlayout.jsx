import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTachometerAlt, FaComments, FaAddressBook, FaUser, FaSignOutAlt, FaCalendarAlt, FaFileAlt } from "react-icons/fa";

const menuItems = [
  { name: "Feed", icon: <FaHome /> },
  { name: "Dashboard", icon: <FaTachometerAlt /> },
  { name: "Messenger", icon: <FaComments /> },
  { name: "Calendar", icon: <FaCalendarAlt /> },
  { name: "Documents", icon: <FaFileAlt /> },
  { name: "Contact Us", icon: <FaAddressBook /> },
  { name: "Profile", icon: <FaUser /> },
  { name: "Logout", icon: <FaSignOutAlt /> },
];

const SidenavLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
    
      <div
        className={`h-screen bg-gray-800 text-white p-4 rounded-l-lg rounded-r-lg transition-all duration-300 ${isOpen ? "w-60" : "w-16"}`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={`/${item.name.toLowerCase().replace(/\s+/g, "")}`}
              className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700"
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </div>
      </div>

      
      <main className={`flex-grow p-5 transition-all duration-300 ${isOpen ? "ml-0" : "ml-0"}`}>{children}</main>
    </div>
  );
};

export default SidenavLayout;