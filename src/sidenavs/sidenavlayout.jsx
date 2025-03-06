import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTachometerAlt, FaComments, FaAddressBook, FaUser, FaSignOutAlt, FaCalendarAlt, FaFileAlt, FaUserPlus } from "react-icons/fa";

const menuItems = [
  { name: "Feed", icon: <FaHome />, navigation: "/landing" },
  { name: "Onboarding", icon: <FaUserPlus />, navigation: "/form" },
  { name: "Dashboard", icon: <FaTachometerAlt />, navigation: "/dashboard" },
  { name: "Messenger", icon: <FaComments />, navigation: "/messenger" },
  { name: "Calendar", icon: <FaCalendarAlt />, navigation: "/calendar" },
  { name: "Documents", icon: <FaFileAlt />, navigation: "/documents" },
  { name: "Contact Us", icon: <FaAddressBook />, navigation: "/contact" },
  { name: "Profile", icon: <FaUser />, navigation: "/profile" },
  { name: "Logout", icon: <FaSignOutAlt />, navigation: "/logout" },
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
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.navigation}
              className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700"
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </div>
      </div>

      <main className={`flex-grow p-5 transition-all duration-300`}>{children}</main>
    </div>
  );
};

export default SidenavLayout;