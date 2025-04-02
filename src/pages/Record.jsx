import { useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";

const RecordModal = ({ open, setOpen, addNewRecord }) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    expenses: "",
    amount: "",
    status: "",
    date: "",
    department: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewRecord(formData);
    setOpen(false);
    setFormData({ employeeId: "", expenses: "", amount: "", status: "", date: "", department: "", note: "" });
  };

  return open ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Expense Record</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          
      
          <div className="grid grid-cols-2 gap-4">
            <TextField name="employeeId" label="Employee ID" variant="outlined" fullWidth value={formData.employeeId} onChange={handleChange} />
            <TextField name="expenses" label="Expenses" variant="outlined" fullWidth value={formData.expenses} onChange={handleChange} />
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            <TextField name="amount" label="Amount" variant="outlined" fullWidth type="number" value={formData.amount} onChange={handleChange} />
            <TextField name="status" label="Status" select variant="outlined" fullWidth value={formData.status} onChange={handleChange}>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </TextField>
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            <TextField name="date" label="Date" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} value={formData.date} onChange={handleChange} />
            <TextField name="department" label="Department" variant="outlined" fullWidth value={formData.department} onChange={handleChange} />
          </div>

          <TextField name="note" label="Note" multiline rows={3} variant="outlined" fullWidth value={formData.note} onChange={handleChange} />

  
          <div className="flex justify-end space-x-4">            <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>

            <Button variant="contained" color="primary" type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default RecordModal;
