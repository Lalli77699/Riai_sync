import React, { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel, Button } from "@mui/material";

const Timesheet = () => {
  const [filter, setFilter] = useState("");

  const timesheetData = [
    {
      TimesheetName: "Alice Johnson",
      employeeId: "EMP001",
      submittedHours: 40,
      approvedHours: 38,
      status: "Approved",
    },
    {
      TimesheetName: "Bob Smith",
      employeeId: "EMP002",
      submittedHours: 42,
      approvedHours: 40,
      status: "Pending",
    },
    {
      TimesheetName: "Charlie Brown",
      employeeId: "EMP003",
      submittedHours: 36,
      approvedHours: 36,
      status: "Rejected",
    },
    {
      TimesheetName: "David Miller",
      employeeId: "EMP004",
      submittedHours: 20,
      approvedHours: 0,
      status: "Draft",
    },
  ];

  const filteredData = filter
    ? timesheetData.filter((record) => record.status === filter)
    : timesheetData;

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Rejected":
        return "text-red-600";
      case "Draft":
        return "text-gray-500";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen text-sm">
      <div className="flex items-center justify-end mb-4 gap-3">
        <FormControl size="small" className="w-44 bg-white rounded shadow-sm">
          <InputLabel>Status</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" size="small">
          Create
        </Button>
      </div>

      <div className="overflow-x-auto shadow rounded-md border border-gray-200">
        <table className="min-w-full bg-white text-gray-800 table-fixed border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white text-xs uppercase">
              <th className="p-2 text-left border-r border-blue-400">Timesheet Name</th>
              <th className="p-2 text-left border-r border-blue-400">Employee Id</th>
              <th className="p-2 text-left border-r border-blue-400">Submitted Hours</th>
              <th className="p-2 text-left border-r border-blue-400">Approved Hours</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((record, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50 border-t border-gray-100"
                >
                  <td className="p-2 border-r border-gray-200">{record.TimesheetName}</td>
                  <td className="p-2 border-r border-gray-200">{record.employeeId}</td>
                  <td className="p-2 border-r border-gray-200">{record.submittedHours}</td>
                  <td className="p-2 border-r border-gray-200">{record.approvedHours}</td>
                  <td className={`p-2 font-medium ${getStatusColor(record.status)}`}>
                    {record.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No timesheet records match the selected status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timesheet;
