import React, { useState, useEffect } from "react";
import { AccountCircle } from "@mui/icons-material";
import Taskmodal from "models/signin/taskmodal";

const ClockIn = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleClockToggle = () => {
    if (isRunning) {
      setIsRunning(false);
      setTime(0);
    } else {
      setModalOpen(true);
      setIsRunning(true);
    }
  };

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-6 text-center w-64">
        <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto flex items-center justify-center overflow-hidden">
          <AccountCircle className="w-30 h-20 text-gray-500" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-gray-800">Employee Name</h2>
        <button
          onClick={handleClockToggle}
          className={`mt-4 px-4 py-2 text-white rounded-md transition 
            ${isRunning ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
        >
          {isRunning ? "Clock Out" : "Clock In"}
        </button>
        <div className="mt-2 text-2xl font-bold text-gray-700">{formatTime(time)}</div>
      </div>

      {modalOpen && <Taskmodal open={modalOpen} setOpen={setModalOpen} />}
    </div>
  );
};

export default ClockIn;
