import React, { useState } from "react";
import { TextField, MenuItem, Button, CircularProgress, Container, Paper, Typography, Grid } from "@mui/material";
import api from "api/api";

const Form = () => {
  const [formData, setFormData] = useState({
    emp_name: "",
    role_id: "",
    department_id: "",
    email: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false); // Loading state

  // Check if all fields are filled
  const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true); // Start loading

    const payload = {
      ...formData,
      role_id: parseInt(formData.role_id),
      department_id: parseInt(formData.department_id),
    };

    console.log("Submitting Payload:", payload);

    try {
      const response = await api.post("/onboardusers", payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false); // Stop loading after API call
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 6, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Employee Onboarding Form
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Employee Name"
                variant="outlined"
                fullWidth
                name="emp_name"
                value={formData.emp_name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                select
                label="Department"
                variant="outlined"
                fullWidth
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                required
              >
                <MenuItem value="1">HR</MenuItem>
                <MenuItem value="2">Admin</MenuItem>
                <MenuItem value="3">Employee</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                select
                label="Role"
                variant="outlined"
                fullWidth
                name="role_id"
                value={formData.role_id}
                onChange={handleChange}
                required
              >
                <MenuItem value="1">Admin</MenuItem>
                <MenuItem value="2">Super Admin</MenuItem>
                <MenuItem value="3">Employee</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Notes"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} className="flex justify-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={!isFormValid || loading} // Disabled if fields are empty or loading
                fullWidth
                sx={{
                  height: 50,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  borderRadius: 2,
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Onboard Employee"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Form;
