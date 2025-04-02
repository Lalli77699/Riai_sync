import React from "react";
import { TextField, MenuItem, Button } from "@mui/material";


const Form = () => {
  return (
    <div className="flex justify-center items-start min-h-screen pt-10">
      <div className="bg-white w-[40vw] h-auto p-6 rounded-lg shadow-3xl flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-center">
          Employee Onboarding Form
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <TextField label="Employee Name" variant="outlined" fullWidth />
          <TextField label="Employee ID" variant="outlined" fullWidth />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <TextField label="Email" type="email" variant="outlined" fullWidth />
          <TextField
            select
            label="Department"
            variant="outlined"
            fullWidth
            defaultValue=""
          >
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
          </TextField>
        </div>

        <TextField
          select
          label="Position"
          variant="outlined"
          fullWidth
          defaultValue=""
          className="mb-6"
        >
          <MenuItem value="Manager">Manager</MenuItem>
          <MenuItem value="Developer">Developer</MenuItem>
          <MenuItem value="Designer">Designer</MenuItem>
        </TextField>
        <br />

        <TextField
          label="Note"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          className="mt-6 mb-6"
        />

        <div className="mt-6 flex justify-center">
          <Button variant="contained" color="primary" size="large">
            Onboard Employee
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
