import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import api from "api/api";
import ToastMessage from "utils/mui/toast";

const Logsmodal = ({ onClose }) => {
  const [client, setClient] = useState("");
  const [task, setTask] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [totalHours, setTotalHours] = useState("00:00");
  const [status, setStatus] = useState("billable");
  const [logDate, setLogDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const [hours, minutes] = totalHours.split(":");
    const formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00.000Z`;

    const payload = {
      log_date: logDate,
      task,
      task_description: taskDescription,
      total_hours: formattedTime,
      status,
      client,
    };

    try {
      const response = await api.post("/worklogs/", payload);
      if (response.status === 200) {
        console.log("Log submitted:", response.data);
        setMessage("✅ Log report has been submitted.");
        setSeverity("success");
        setIsOpen(true);

        setTimeout(() => {
          setLoading(false);
          onClose();
        }, 1500);
      } else {
        console.error("Unexpected status code:", response.status);
        setMessage("❌ Failed to submit the log.");
        setSeverity("error");
        setIsOpen(true);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setMessage("❌ Something went wrong while submitting.");
      setSeverity("error");
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Log Work</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={logDate}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setLogDate(e.target.value)}
              className="w-1/2 border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Client */}
          <div>
            <label className="block text-sm font-medium mb-1">Project Name</label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Enter project/client name"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Task */}
          <div>
            <label className="block text-sm font-medium mb-1">Task</label>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Task Description</label>
            <textarea
              rows={3}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full border border-gray-300 p-2 rounded resize-none focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Total Hours */}
          <div>
            <label className="block text-sm font-medium mb-1">Total Hours</label>
            <input
              type="time"
              value={totalHours}
              onChange={(e) => setTotalHours(e.target.value)}
              className="w-1/2 border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              step="60"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-1/2 border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="billable">Billable</option>
              <option value="nonbillable">Non-Billable</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => {
                setMessage("⚠️ You did not submit your log report for today.");
                setSeverity("warning");
                setIsOpen(true);
                setTimeout(() => {
                  onClose();
                }, 1500);
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center min-w-[100px]"
            >
              {loading ? <CircularProgress size={20} color="inherit" /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
      
      <ToastMessage
        message={message}
        severity={severity}
        open={isOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Logsmodal;
