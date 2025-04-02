import React, { useState } from "react";
import Profile from "./profile";
import Devices from "./Devices";
import Logout from "./logout";

const tabItems = [
  { name: "My Details", id: "details" }, 
  { name: "Devices Connected", id: "devices" },
  { name: "Logout", id: "logout" },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("details");


  return (
    <div className="flex h-auto">
      {/* Sidebar Tabs */}
      <div className="h-full bg-gray-800 text-white p-4 rounded-r-lg transition-all duration-300 w-60">
        <div className="flex flex-col space-y-4">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 p-2 rounded hover:bg-gray-700 w-full text-left ${
                activeTab === tab.id ? "bg-gray-700" : ""
              }`}
            >
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <main className="flex-grow p-5 bg-white shadow-md rounded-lg">
        {activeTab === "details" && <Profile />} {/* Load Profile directly */}
        {activeTab === "devices" && <Devices/>}
        {activeTab === "logout" && <Logout/>}
      </main>
    </div>
  );
};

export default Tabs;
