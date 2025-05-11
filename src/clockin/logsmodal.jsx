import { useState, useEffect, useRef } from "react";

const Logsmodal = ({ onClose }) => {
  const [projectName, setProjectName] = useState("");
  const [jobName, setJobName] = useState("");
  const [workItem, setWorkItem] = useState("");
  const [description, setDescription] = useState("");
  const [logMode, setLogMode] = useState("total");
  const [totalHours, setTotalHours] = useState("00:00");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [billable, setBillable] = useState("billable");

  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalTotalHours = logMode === "timer" ? formatTime(timer) : totalHours;

    const logData = {
      projectName,
      jobName,
      workItem,
      description,
      logMode,
      totalHours: finalTotalHours,
      startTime,
      endTime,
      billable,
    };

    console.log(logData);
    onClose();
  };

  const inputClasses =
    "flex-1 border border-gray-300 p-2 rounded text-sm focus:outline-none focus:border-blue-500 focus:border";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-200 p-5 rounded-xl shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4 text-left">Log Time</h2>

        <div className="bg-white p-4 rounded-lg shadow-inner">
          <form className="space-y-3">
            {[ 
              { label: "Project Name", value: projectName, onChange: setProjectName },
              { label: "Job Name", value: jobName, onChange: setJobName },
              { label: "Work Item", value: workItem, onChange: setWorkItem }
            ].map(({ label, value, onChange }) => (
              <div key={label} className="flex items-center gap-2">
                <label className="w-32 text-sm font-medium">{label}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className={inputClasses}
                />
              </div>
            ))}

            <div className="flex items-start gap-2">
              <label className="w-32 pt-2 text-sm font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${inputClasses} resize-none`}
                rows={3}
              />
            </div>

            <div className="flex items-start gap-2">
              <label className="w-32 text-sm font-medium pt-1">Hours</label>
              <div className="flex-1 flex flex-col gap-2 text-sm">
                {["total", "startEnd", "timer"].map((mode) => (
                  <div key={mode} className="flex items-center gap-3 mb-1">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value={mode}
                        checked={logMode === mode}
                        onChange={() => setLogMode(mode)}
                        className="mr-1"
                      />
                      {mode === "total" && "Total Hours"}
                      {mode === "startEnd" && "Start & End Time"}
                      {mode === "timer" && "Timer"}
                    </label>

                    {logMode === "total" && mode === "total" && (
                      <input
                        type="text"
                        value={totalHours}
                        onChange={(e) => setTotalHours(e.target.value)}
                        className="border border-gray-300 rounded text-sm p-2 focus:outline-none focus:border-blue-500 w-32"
                        placeholder="e.g., 01:30"
                      />
                    )}

                    {logMode === "startEnd" && mode === "startEnd" && (
                      <div className="flex gap-2">
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="border border-gray-300 rounded text-sm p-2 focus:outline-none focus:border-blue-500 w-28"
                        />
                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="border border-gray-300 rounded text-sm p-2 focus:outline-none focus:border-blue-500 w-28"
                        />
                      </div>
                    )}

                    {logMode === "timer" && mode === "timer" && (
                      <div className="flex items-center gap-3">
                        <div className="text-base font-mono">{formatTime(timer)}</div>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => setIsRunning(true)}
                            className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                          >
                            Start
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsRunning(false)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600"
                          >
                            Stop
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsRunning(false);
                              setTimer(0);
                            }}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="w-32 text-sm font-medium">Billable</label>
              <select
                value={billable}
                onChange={(e) => setBillable(e.target.value)}
                className={inputClasses}
              >
                <option value="billable">Billable</option>
                <option value="non-billable">Non-Billable</option>
              </select>
            </div>
          </form>
        </div>

        <div className="flex justify-end mt-5 gap-3">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logsmodal;
