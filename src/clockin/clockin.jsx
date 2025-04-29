import React, { useState, useEffect } from "react";
import { AccountCircle } from "@mui/icons-material";
import Taskmodal from "models/signin/taskmodal";
import { useSelector } from "react-redux";
import api from "api/api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const ClockIn = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [clockData, setClockData] = useState(null);
  const [status, setStatus] = useState("loading"); 

  const user = useSelector((state) => state.user.user);

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
      // Clocking out
      setIsRunning(false);
      setTime(0);
    } else {
      // Clocking in
      setModalOpen(true);
      setIsRunning(true);
    }
  };
  const checkin= async()=>{
    try {
      const response = await api.post('/attendance/',{
        "shift": "General",
        "checkin_location": "string",
        "device_info": "string",
        "ip_address": "string",
        "notes": "string",
        "status": "active",
        "info": {
          "additionalProp1": {}
        },
        "signout_by": user.emp_id
      })
      
    } catch (error) {
      
    }finally{
fetchClockData()
    }
  }
  const checkout= async()=>{
    try {
      const response = await api.get(`/attendance/checkout`);
      
    } catch (error) {
      
    }finally{
fetchClockData()
    }
  }
  const getTimeDifference = (start, end = dayjs()) => {
    const startTime = dayjs.utc(start).local();
    const endTime = dayjs.utc(end).local();
    const diffInSeconds = endTime.diff(startTime, "second");

    const hrs = String(Math.floor(diffInSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((diffInSeconds % 3600) / 60)).padStart(2, "0");
    const secs = String(diffInSeconds % 60).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  };

  const fetchClockData = async () => {
    try {
      const res = await api.get(`/attendance/get`);
      if (res.status === 201 || !res.data?.data) {
        setStatus("clockin");
      } else {
        const data = res.data.data;
        setClockData(data);

        if (data.check_in && !data.check_out) {
          // still clocked in
          setStatus("clockout");
          const diff = getTimeDifference(data.check_in);
          const diffParts = diff.split(":");
          const totalSeconds = (+diffParts[0]) * 3600 + (+diffParts[1]) * 60 + (+diffParts[2]);
          setTime(totalSeconds);
          setIsRunning(true);
        } else if (data.check_in && data.check_out) {
          // already clocked out
          setStatus("submitted");
        }
      }
    } catch (err) {
      console.error("Error fetching attendance:", err);
      setStatus("clockin");
    }
  };

  useEffect(() => {
    if (user?.emp_id) {
      fetchClockData();
    }
  }, [user]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="relative h-70 flex justify-end p-2">
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-8">
        {/* Profile & Name */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            <AccountCircle className="w-14 h-14 text-gray-500" />
          </div>
          {user?.first_name && (
            <h4 className="mt-2 text-lg font-semibold text-gray-800">
              {user.first_name} {user.last_name}
            </h4>
          )}
        </div>

        {/* Button or Status */}
        <div className="flex flex-col items-center">
          {status === "clockin" && (
            <>
              <button
                onClick={()=>checkin()}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
              >
                Clock In
              </button>
              <div className="mt-2 text-2xl font-bold text-gray-700">{formatTime(time)}</div>
            </>
          )}

          {status === "clockout" && (
            <>
              <button
                onClick={()=>checkout()}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition"
              >
                Clock Out
              </button>
              <div className="mt-2 text-2xl font-bold text-gray-700">{formatTime(time)}</div>
            </>
          )}

          {status === "submitted" && (
            <>
              <span className="text-green-700 font-semibold text-xl">Submitted</span>
              <div className="mt-2 text-lg text-gray-700">
                {getTimeDifference(clockData.check_in, clockData.check_out)}
              </div>
            </>
          )}
        </div>
      </div>

      {modalOpen && <Taskmodal open={modalOpen} setOpen={setModalOpen} />}
    </div>
  );
};

export default ClockIn;
