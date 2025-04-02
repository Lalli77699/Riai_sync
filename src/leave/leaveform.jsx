import React from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LeaveForm = () => {
  const navigate = useNavigate(); 

  const handleCancel = () => {
    navigate("/landing"); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Leave application submitted successfully!");
  };

  return (
    <div className="flex justify-center items-start h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Apply Leave</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField fullWidth label="Leave Type" variant="outlined" required />
          
          <TextField select fullWidth label="Select Type" variant="outlined">
            <MenuItem value="sick">Sick Leave</MenuItem>
            <MenuItem value="casual">Casual Leave</MenuItem>
            <MenuItem value="annual">Annual Leave</MenuItem>
          </TextField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField fullWidth label="From Date" type="date" InputLabelProps={{ shrink: true }} variant="outlined" required />
            <TextField fullWidth label="To Date" type="date" InputLabelProps={{ shrink: true }} variant="outlined" required />
          </div>

          <TextField fullWidth label="Team Email ID" type="email" variant="outlined" required />
          
          <TextField fullWidth label="Reason for Leave" multiline rows={3} variant="outlined" required />

          <div className="flex justify-end gap-3 mt-4">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button type="button" onClick={handleCancel} variant="outlined" color="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveForm;