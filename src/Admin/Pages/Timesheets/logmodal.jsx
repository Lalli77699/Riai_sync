import { useState } from "react";
import api from "api/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const Logmodal = ({ onClose, fetchLogs, weekStart, logsByDate }) => {
  const [client, setClient] = useState("");
  const [task, setTask] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [totalHours, setTotalHours] = useState("00:00");
  const [status, setStatus] = useState("billable");
  const [logDate, setLogDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logDate) {
      alert("Please select a valid date.");
      return;
    }

    const [hours, minutes] = totalHours.split(":");
    const formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00.000Z`;

    const payload = {
      log_date: dayjs(logDate).format("YYYY-MM-DD"),
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
        fetchLogs();
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        console.error("Unexpected status code:", response.status);
        alert(response?.message || "Failed to submit the log");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong");
    }
  };

  // Get valid dates for the week (Mon–Fri) that are not in logsByDate
  const getValidDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const current = dayjs(weekStart).add(i, "day");
      const day = current.day();
      const isoDate = current.format("YYYY-MM-DD");

      if (day !== 0 && day !== 6 && !(isoDate in logsByDate)) {
        dates.push(current.toDate());
      }
    }
    return dates;
  };

  const validDates = getValidDates();

  const isDateSelectable = (date) => {
    return validDates.some(
      (d) => dayjs(d).format("YYYY-MM-DD") === dayjs(date).format("YYYY-MM-DD")
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Log Work</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <DatePicker
              selected={logDate}
              onChange={(date) => setLogDate(date)}
              filterDate={isDateSelectable}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select date"
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
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Logmodal;
