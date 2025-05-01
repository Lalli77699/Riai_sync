import React, { useEffect, useState } from "react";
import api from "api/api";
import { useSelector } from "react-redux";

const Sheet = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await api.get("/attendance/today");
      if (response.data?.success && Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Error fetching attendance:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (attendanceId, actionType) => {
    try {
      await api.put("/attendance/update", {
        attendance_id: attendanceId,
        is_reset: actionType === "r",
        is_checkout: actionType === "c",
      });
    } catch (err) {
      console.error("Error updating attendance:", err);
    } finally {
      fetchAttendance();
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Attendance Records</h1>

      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : data.length === 0 ? (
        <div className="flex justify-center mt-20">
          <p className="text-gray-500 text-lg">No attendance data yet</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((entry, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                {entry.emp_name || "Unnamed Employee"}
              </h2>
              <div className="text-sm text-gray-700 space-y-1">
                <p><span className="font-medium">Shift:</span> {entry.shift || "N/A"}</p>
                <p><span className="font-medium">Check-in Location:</span> {entry.checkin_location || "N/A"}</p>
                <p><span className="font-medium">Device Info:</span> {entry.device_info || "N/A"}</p>
                <p><span className="font-medium">IP Address:</span> {entry.ip_address || "N/A"}</p>
                <p>
                  <span className="font-medium">Clock In:</span>{" "}
                  {entry.check_in
                    ? new Date(entry.check_in).toLocaleString()
                    : "N/A"}
                </p>
                <p>
                  <span className="font-medium">Clock Out:</span>{" "}
                  {entry.check_out
                    ? new Date(entry.check_out).toLocaleString()
                    : "N/A"}
                </p>
                <p><span className="font-medium">Status:</span> {entry.status}</p>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleReset(entry.attendance_id, "r")}
                  className="px-4 py-2 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-300 hover:bg-yellow-200 transition"
                >
                  Reset
                </button>
                {!entry.check_out && (
                  <button
                    onClick={() => handleReset(entry.attendance_id, "c")}
                    className="px-4 py-2 text-sm font-medium bg-green-100 text-green-800 rounded-lg border border-green-300 hover:bg-green-200 transition"
                  >
                    Check Out
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sheet;
