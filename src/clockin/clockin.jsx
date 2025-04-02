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
    <div className="relative h-70 flex justify-end p-2">
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-8">
        
        {/* Profile & Employee Name Section */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            <AccountCircle className="w-14 h-14 text-gray-500" />
          </div>
          <h4 className="mt-2 text-lg font-semibold text-gray-800">Employee Name</h4>
        </div>

        {/* Clock In/Out & Timer Section */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleClockToggle}
            className={`px-4 py-2 text-white rounded-md transition 
              ${isRunning ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
          >
            {isRunning ? "Clock Out" : "Clock In"}
          </button>
          <div className="mt-2 text-2xl font-bold text-gray-700">{formatTime(time)}</div>
        </div>
      </div>

      {modalOpen && <Taskmodal open={modalOpen} setOpen={setModalOpen} />}
    </div>
  );
};

export default ClockIn;
