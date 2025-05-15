import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Timesheet from "./timesheet";
import Timesheetdata from "./Timesheetdata";
import api from "api/api";
import dayjs from "dayjs";
import Logmodal from "./logmodal";

const Timetracker = () => {
  const [activeTab, setActiveTab] = useState("Time Logs");
  const [weekStart, setWeekStart] = useState(getCurrentMonday());
  const [logsByDate, setLogsByDate] = useState({});
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [editingLog, setEditingLog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);


  const navigate = useNavigate();

  function getCurrentMonday() {
    const today = dayjs();
    return today.day() === 0 ? today.subtract(6, "day") : today.startOf("week").add(1, "day");
  }

  const getWeekRange = (start) => Array.from({ length: 7 }, (_, i) => start.add(i, "day"));
  const formatDate = (date) => date.format("YYYY-MM-DD");
  const formatUIDate = (date) => date.format("MMM D, YYYY");
  const getDayName = (date) => date.format("ddd");

  const fetchLogs = async () => {
    setLoading(true);
    const startDate = weekStart.format("DD-MM-YYYY");
    const endDate = weekStart.add(6, "day").format("DD-MM-YYYY");
    try {
      const response = await api.get(`/worklogs/get?start_date=${startDate}&end_date=${endDate}`);
      const rawData = response.data.data;
      const logsArray = Array.isArray(rawData) ? rawData : rawData ? [rawData] : [];

      const grouped = logsArray.reduce((acc, log) => {
        const date = log.log_date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(log);
        return acc;
      }, {});
      setLogsByDate(grouped);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
      setLogsByDate({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [weekStart]);

  const handleWeekChange = (direction) => {
    setWeekStart((prev) => prev.add(direction === "next" ? 7 : -7, "day"));
  };

  const handleDelete = async (logId) => {
    const confirmed = window.confirm("Are you sure you want to delete this log?");
    if (!confirmed) return;
    setLoading(true);
    try {
      await api.delete(`/worklogs/${logId}`);
      await fetchLogs();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        task: editingLog.task,
        task_description: editingLog.task_description,
        total_hours: editingLog.total_hours,
        status: editingLog.status,
        client: editingLog.client,
      };
      await api.put(`/worklogs/${editingLog.log_id}`, payload);
      setEditingLog(null);
      await fetchLogs();
    } catch (error) {
      console.error("Edit failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const weekDates = getWeekRange(weekStart);

  return (
    <div className="w-full space-y-6 p-4 bg-gray-100 min-h-screen relative">
      {/* Tabs */}
      <div className="bg-white p-4 rounded-md shadow flex space-x-8">
        {["Time Logs", "Time Sheets", "Timesheet Data"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-1 text-sm font-semibold transition ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Time Logs */}
      {activeTab === "Time Logs" && (
        <div className="space-y-6">
          {/* Week Picker + Create Log */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={() => handleWeekChange("prev")} className="text-xl text-blue-600 font-bold px-2">
                {"<"}
              </button>
              <div className="flex items-center gap-2 text-sm">
                <CalendarTodayIcon className="text-blue-500" />
                <span>
                  {weekStart.format("DD-MM-YYYY")} - {weekStart.add(6, "day").format("DD-MM-YYYY")}
                </span>
              </div>
              <button onClick={() => handleWeekChange("next")} className="text-xl text-blue-600 font-bold px-2">
                {">"}
              </button>
            </div>
            <button
            onClick={() => setShowLogModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              + Create Log
              </button>

          </div>

          {/* Table Header */}
          <div className="grid grid-cols-8 bg-gray-100 rounded-t-lg px-4 py-2 text-sm font-semibold text-gray-600 border border-b-0">
            <div className="border-r pr-2">Date</div>
            <div className="border-r px-2">Day</div>
            <div className="border-r px-2">Client</div>
            <div className="border-r px-2">Task</div>
            <div className="border-r px-2">Hours</div>
            <div className="border-r px-2">Status</div>
            <div className="border-r px-2">Description</div>
            <div className="px-2">Actions</div>
          </div>

          {/* Loader */}
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-60 flex justify-center items-center z-10 rounded-b-lg">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            </div>
          )}

          {/* Logs */}
          <div className="divide-y border rounded-b-lg bg-white relative">
            {(() => {
              const weekdaysLogs = weekDates.slice(0, 5).map((dateObj) => {
                const d = formatDate(dateObj);
                return logsByDate[d] || [];
              });
              const hasWeekdayLogs = weekdaysLogs.some((logs) => logs.length > 0);

              if (!hasWeekdayLogs) {
                return (
                  <div className="grid grid-cols-8 text-gray-700">
                    <div className="col-span-5 border-r px-4 py-3 text-center italic text-gray-500">
                      No log report
                    </div>
                    <div className="border-r px-4 py-3 text-center text-gray-400 font-semibold">
                      Weekend
                    </div>
                    <div className="px-4 py-3 text-center text-gray-400 font-semibold">
                      Weekend
                    </div>
                  </div>
                );
              }

              const rows = [];
              for (let i = 0; i < 5; i++) {
                const dateObj = weekDates[i];
                const d = formatDate(dateObj);
                const logs = logsByDate[d] || [];

                if (logs.length === 0) {
                  rows.push(
                    <div key={d} className="grid grid-cols-8 px-4 py-3 text-sm text-gray-600 bg-white border-b">
                      <div className="border-r pr-2">{formatUIDate(dateObj)}</div>
                      <div className="border-r px-2">{getDayName(dateObj)}</div>
                      <div className="border-r px-2 italic text-gray-400 col-span-6">No logs</div>
                    </div>
                  );
                } else {
                  logs.forEach((log) => {
                    const logDate = dayjs(log.log_date);
                    rows.push(
                      <div key={log.log_id} className="grid grid-cols-8 px-4 py-3 text-sm text-gray-800 bg-white border-b">
                        <div className="border-r pr-2">{formatUIDate(logDate)}</div>
                        <div className="border-r px-2">{getDayName(logDate)}</div>
                        <div className="border-r px-2">{log.client}</div>
                        <div className="border-r px-2">{log.task}</div>
                        <div className="border-r px-2">{log.total_hours?.slice(0, 5)}</div>
                        <div className="border-r px-2 capitalize">{log.status}</div>
                        <div
                          className="border-r px-4 pr-4 text-blue-600 cursor-pointer"
                          onClick={() => setSelectedDescription(log.task_description)}
                          title="View description"
                        >
                          <DescriptionIcon />
                        </div>
                        <div className="px-4 flex items-center gap-3">
                          <EditIcon
                            className="cursor-pointer text-green-600"
                            onClick={() => setEditingLog(log)}
                            title="Edit log"
                          />
                          <DeleteIcon
                            className="cursor-pointer text-red-600"
                            onClick={() => handleDelete(log.log_id)}
                            title="Delete log"
                          />
                        </div>
                      </div>
                    );
                  });
                }
              }

              const weekendRows = weekDates.slice(5, 7).map((dateObj) => (
                <div key={formatDate(dateObj)} className="grid grid-cols-8 px-4 py-3 text-sm text-gray-400 bg-gray-50 font-semibold">
                  <div className="border-r pr-2">{formatUIDate(dateObj)}</div>
                  <div className="border-r px-2">{getDayName(dateObj)}</div>
                  <div className="col-span-6 px-2">Weekend</div>
                </div>
              ));

              return [...rows, ...weekendRows];
            })()}
          </div>
        </div>
      )}

      {activeTab === "Time Sheets" && <Timesheet />}
      {activeTab === "Timesheet Data" && <Timesheetdata />}

      {/* Description Modal */}
      <Modal open={!!selectedDescription} onClose={() => setSelectedDescription(null)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-4">
          <h2 className="text-lg font-semibold mb-2">Task Description</h2>
          <div className="bg-gray-100 p-4 rounded text-sm text-gray-800 whitespace-pre-line">
            {selectedDescription}
          </div>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal open={!!editingLog} onClose={() => setEditingLog(null)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 space-y-4">
          <h2 className="text-lg font-semibold mb-2">Edit Log</h2>
          {editingLog && (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Task"
                value={editingLog.task}
                onChange={(e) => setEditingLog({ ...editingLog, task: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <textarea
                placeholder="Task Description"
                value={editingLog.task_description}
                onChange={(e) => setEditingLog({ ...editingLog, task_description: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Total Hours (HH:mm)"
                value={editingLog.total_hours}
                onChange={(e) => setEditingLog({ ...editingLog, total_hours: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Status (billable/non-billable)"
                value={editingLog.status}
                onChange={(e) => setEditingLog({ ...editingLog, status: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Client"
                value={editingLog.client}
                onChange={(e) => setEditingLog({ ...editingLog, client: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingLog(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Save
                </button>
              </div>
            </form>
          )}
        </Box>
      </Modal>

      <style>{`
        .loader {
          border-top-color: #3498db;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      {showLogModal && <Logmodal onClose={() => setShowLogModal(false)} />}

    </div>
  );
};

export default Timetracker;
