import React from "react";
import { Home, Settings, Dashboard, Logout } from "@mui/icons-material";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <nav className="flex flex-col space-y-4">
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
  );
};

const Navbar = () => {
  return (
    <div className="w-full bg-gray-800 p-4 text-white flex justify-between items-center shadow-md">
      <h2 className="text-2xl font-semibold">Welcome Back</h2>
      <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 flex items-center space-x-2">
        <Logout />
        <span>Logout</span>
      </button>
    </div>
  );
};

const DashboardScreen = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold">Message {item}</h3>
              <p className="text-gray-600 mt-2">Some content here</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
