import React from "react";
import { Home, Settings, Dashboard, Logout, Person } from "@mui/icons-material";

const Navbar = () => {
  return (
    <div className="w-full bg-gray-900 p-4 text-white flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <nav className="flex space-x-6">
          <button className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded">
            <Home />
            <span>Home</span>
          </button>
          <button className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded">
            <Dashboard />
            <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded">
            <Settings />
            <span>Settings</span>
          </button>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Person className="text-white" />
        <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 flex items-center space-x-2">
          <Logout />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

const Practice = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col items-start">
            <h3 className="text-xl font-semibold">Card {item}</h3>
            <p className="text-gray-600 mt-2">Quick summary of content</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Practice;
