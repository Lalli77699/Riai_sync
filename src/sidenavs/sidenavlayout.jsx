import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaTachometerAlt,
  FaComments,
  FaAddressBook,
  FaUser,
  FaSignOutAlt,
  FaCalendarAlt,
  FaFileAlt,
  FaUserPlus,
} from "react-icons/fa";
import { MdAssignment, MdOutlineRequestPage } from "react-icons/md";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { IoWallet } from "react-icons/io5";
import { useSelector } from "react-redux";

const menuItems = [
  { name: "Home", icon: <FaHome />, navigation: "/landing" },
  { name: "Onboarding", icon: <FaUserPlus />, navigation: "/onboard" },
  { name: "Dashboard", icon: <FaTachometerAlt />, navigation: "/dashboard" },
  { name: "Leave Tracker", icon: <BsFillCalendarCheckFill />, navigation: "/leaverequest" },
  { name: "Leave Request", icon: <MdOutlineRequestPage />, navigation: "/leaveform" },
  { name: "Messenger", icon: <FaComments />, navigation: "/messenger" },
  { name: "Logsheet", icon: <MdAssignment />, navigation: "/logsheet" },
  { name: "Expense Tracker", icon: <IoWallet />, navigation: "/expenses" },
  { name: "Calendar", icon: <FaCalendarAlt />, navigation: "/calendar" },
  { name: "Documents", icon: <FaFileAlt />, navigation: "/documents" },
  { name: "Contact Us", icon: <FaAddressBook />, navigation: "/contact" },
  { name: "Profile", icon: <FaUser />, navigation: "/Tabs" },
  { name: "Logout", icon: <FaSignOutAlt />, navigation: "/logout" },
];


const hiddenRoutes = ["/", "/login", "/signup", "/register", "/verify"];

const SidenavLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const shouldHideSidebar = hiddenRoutes.includes(location.pathname);

  
  if (!user) return null;

  const filteredMenuItems = menuItems.filter((item) => {
    
    if (user.role_id === 1 || user.role_id === 2) {
      return item.name === "Home" || item.name === "Onboarding";
    } else {
      return item.name !== "Onboarding";
    }
  });

  return (
    <div className="flex h-auto">
      {!shouldHideSidebar && (
        <div
        className={`${
          user.role_id === 1 || user.role_id === 2 ? "h-screen" : "h-full"
        } bg-gray-800 text-white p-4 rounded-r-lg transition-all duration-300 ${
          isOpen ? "w-60" : "w-16"
        }`}
      
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="flex flex-col space-y-4">
            {filteredMenuItems.map((item, index) => (
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
      )}

      <main className="flex-grow p-5">{children}</main>
    </div>
  );
};

export default SidenavLayout;
