import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "api/api";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import ToastMessage from "utils/mui/toast";

const Onboardingform = () => {
  const [formData, setFormData] = useState({
    emp_name: "",
    role_id: "",
    department_id: "",
    email: "",
    notes: "",
  });

  const [initialLoading, setInitialLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
  };

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset department_id when role_id changes
    if (name === "role_id") {
      setFormData((prev) => ({ ...prev, [name]: value, department_id: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchDropdownData = async () => {
    try {
      setInitialLoading(true);

      const roleRes = await api.get("/data/roles");
      if (roleRes.status === 200) {
        setRoles(roleRes.data || []);
      }

      const deptRes = await api.get("/data/departments");
      if (deptRes.status === 200) {
        setDepartments(deptRes.data || []);
      }
    } catch (err) {
      console.error("Dropdown fetch error:", err);
    } finally {
      setInitialLoading(false);
    }
  };

  const getFilteredDepartments = () => {
    if (formData.role_id === "3") {
      return departments.filter((dept) =>
        ["1", "3", "4"].includes(dept.department_id.toString())
      );
    }
    return departments;
  };

  const submitFormData = async () => {
    const payload = {
      ...formData,
      role_id: parseInt(formData.role_id),
      department_id: parseInt(formData.department_id),
    };

    try {
      const response = await api.post("/onboardusers/", payload, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        setMessage("User onboarded successfully");
        setSeverity("success");
        setIsOpen(true);
        setFormData({
          emp_name: "",
          role_id: "",
          department_id: "",
          email: "",
          notes: "",
        });
      } else if (response.status === 201) {
        setMessage(response?.data?.detail);
        setSeverity("info");
        setIsOpen(true);
      } else {
        setMessage("Something went wrong");
        setSeverity("error");
        setIsOpen(true);
      }

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Submit error:", error.response?.data || error.message);
      setMessage("Something went wrong");
      setSeverity("error");
      setIsOpen(true);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setSubmitLoading(true);
    await submitFormData();
  };

  useEffect(() => {
    fetchDropdownData();
  }, []);

  return (
    <>
      <Backdrop open={initialLoading} sx={{ zIndex: 1300, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="relative w-full">
        <button
          type="button"
          className="absolute top-4 right-6 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition duration-200"
          onClick={() => navigate("/usersonboard")}
        >
          View Onboarders
        </button>
      </div>

      {!initialLoading && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 mt-20 px-6">
          <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Employee Onboarding Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-1 font-semibold">Employee Name</label>
                <input
                  type="text"
                  name="emp_name"
                  value={formData.emp_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-semibold">Role</label>
                  <select
                    name="role_id"
                    value={formData.role_id}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role.role_id} value={role.role_id}>
                        {role.role_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Department</label>
                  <select
                    name="department_id"
                    value={formData.department_id}
                    onChange={handleChange}
                    required
                    disabled={!formData.role_id}
                    className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Department</option>
                    {getFilteredDepartments().map((dept) => (
                      <option key={dept.department_id} value={dept.department_id}>
                        {dept.department_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-semibold">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!isFormValid || submitLoading}
                  className={`w-full py-3 text-white font-semibold rounded-md transition-all duration-200 ${
                    submitLoading || !isFormValid
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {submitLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <CircularProgress size={20} color="inherit" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Onboard Employee"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastMessage message={message} severity={severity} open={isOpen} handleClose={handleClose} />
    </>
  );
};

export default Onboardingform;
