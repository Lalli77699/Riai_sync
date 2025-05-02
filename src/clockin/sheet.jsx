import React, { useEffect, useState } from "react";
import api from "api/api";
import { useSelector } from "react-redux";
import moment from 'moment-timezone';
const Sheet = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState({});
  const [checkOutLoading, setCheckOutLoading] = useState({}); // New state for check-out loading
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async (state) => {
    if (!state) {
      setLoading(true);
    }

    try {
      const response = await api.get("/attendance/today");
      if (response.data?.success && Array.isArray(response.data.data)) {
        setData(response.data.data);
        setFiltered(response.data.data);
      } else {
        setData([]);
        setFiltered([]);
      }
    } catch (err) {
      console.error("Error fetching attendance:", err);
      setData([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (attendanceId, actionType) => {
    setActionLoading((prev) => ({ ...prev, [attendanceId]: true }));

    try {
      await api.put("/attendance/update", {
        emp_id: attendanceId,
        is_reset: actionType === "r",
        is_checkout: actionType === "c",
      });
    } catch (err) {
      console.error("Error updating attendance:", err);
    } finally {
      await fetchAttendance(true);
      setActionLoading((prev) => ({ ...prev, [attendanceId]: false }));
    }
  };

  const handleCheckOut = async (attendanceId) => {
    setCheckOutLoading((prev) => ({ ...prev, [attendanceId]: true }));

    try {
      await api.put("/attendance/update", {
        emp_id: attendanceId,
        is_checkout: true,
      });
    } catch (err) {
      console.error("Error checking out:", err);
    } finally {
      await fetchAttendance(true);
      setCheckOutLoading((prev) => ({ ...prev, [attendanceId]: false }));
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    if (!query) return setFiltered(data);
    const result = data.filter(
      (entry) =>
        (entry.emp_name && entry.emp_name.toLowerCase().includes(query)) ||
        (entry.attendance_id && entry.attendance_id.toString().includes(query))
    );
    setFiltered(result);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Title + Search Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Attendance Records</h1>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name or ID"
          className="w-full md:w-72 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex justify-center mt-20">
          <p className="text-gray-500 text-lg">No attendance data found</p>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-2xl font-bold text-blue-800 mb-3">
                {entry.emp_name || "Unnamed Employee"}
              </h2>

              <div className="text-sm text-gray-800 space-y-2">
                <p><span className="font-semibold">🆔 ID:</span> {entry.attendance_id}</p>
                <p><span className="font-semibold">🕐 Shift:</span> {entry.shift || "N/A"}</p>
                <p>
                  <span className="font-semibold">📍 Check-in Location:</span>{" "}
                  {entry.checkin_location ? (
                    <a
                      href={`https://www.google.com/maps?q=${entry.checkin_location}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {entry.checkin_location}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
                <p><span className="font-semibold">💻 Device Info:</span> {entry.device_info || "N/A"}</p>
                <p><span className="font-semibold">🌐 IP Address:</span> {entry.ip_address || "N/A"}</p>
                
                <p>
  <span className="font-semibold">🕓 Clock In:</span> 
  {entry.check_in ? moment.utc(entry.check_in).local().format('YYYY-MM-DD HH:mm:ss') : "N/A"}
</p>
<p>
  <span className="font-semibold">🕕 Clock Out:</span> 
  {entry.check_out ? moment.utc(entry.check_out).local().format('YYYY-MM-DD HH:mm:ss') : "N/A"}
</p>

                <p><span className="font-semibold">📌 Status:</span> {entry.status}</p>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => handleReset(entry.emp_id, "r")}
                  disabled={actionLoading[entry.emp_id]}
                  className="flex-1 px-4 py-2 text-sm font-semibold bg-yellow-100 text-yellow-800 rounded-xl border border-yellow-300 hover:bg-yellow-200 transition duration-200 disabled:opacity-60"
                >
                  {actionLoading[entry.emp_id] ? (
                    <span className="flex justify-center items-center">
                      <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Resetting
                    </span>
                  ) : (
                    <>🔁 Reset</>
                  )}
                </button>

                {!entry.check_out && (
                  <button
                    onClick={() => handleCheckOut(entry.emp_id)}
                    disabled={checkOutLoading[entry.emp_id]}
                    className="flex-1 px-4 py-2 text-sm font-semibold bg-green-100 text-green-800 rounded-xl border border-green-300 hover:bg-green-200 transition duration-200 disabled:opacity-60"
                  >
                    {checkOutLoading[entry.emp_id] ? (
                      <span className="flex justify-center items-center">
                        <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                        Clocking out
                      </span>
                    ) : (
                      <>✅ Clock Out</>
                    )}
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
