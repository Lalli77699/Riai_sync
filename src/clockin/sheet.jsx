import React from "react";

const Sheet = () => {
  // Fake employee attendance data
  const data = [
    {
      name: "Subhash Varma",
      clockIn: "08:45 AM",
      clockOut: "05:00 PM",
      status: "Present",
    },
    {
      name: "Lalli Priya",
      clockIn: "09:15 AM",
      clockOut: "04:30 PM",
      status: "Late",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Attendance Records</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-3">Employee Name</th>
              <th className="border p-3">Clock In</th>
              <th className="border p-3">Clock Out</th>
              <th className="border p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => (
              <tr key={index} className="border hover:bg-gray-100 odd:bg-gray-50 even:bg-white">
                <td className="border p-3">{employee.name}</td>
                <td className="border p-3">{employee.clockIn}</td>
                <td className="border p-3">{employee.clockOut}</td>
                <td
                  className={`border p-3 font-semibold ${
                    employee.status === "Present" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {employee.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sheet;
