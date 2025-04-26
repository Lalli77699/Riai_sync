import React, { useEffect, useState } from "react";
import api from "api/api";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

const Usersonboard = () => {
  const [users, setUsers] = useState([]);
  const [editingEmpId, setEditingEmpId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  const fetchUsers = async () => {
    try {
      const response = await api.get("/onboardusers/");
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingEmpId(user.emp_id);
    setEditedUser(user);
  };

  const handleChange = (e, key) => {
    setEditedUser((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await api.put(`/onboardusers/${editedUser.emp_id}/`, editedUser);
      setUsers((prev) =>
        prev.map((u) => (u.emp_id === editedUser.emp_id ? editedUser : u))
      );
      setEditingEmpId(null);
      setEditedUser({});
    } catch (err) {
      console.error("Failed to update user", err);
    }
  };

  const handleDelete = async (emp_id) => {
    try {
      await api.delete(`/onboardusers/${emp_id}/`);
      setUsers((prev) => prev.filter((u) => u.emp_id !== emp_id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleView = (emp_id) => {
    console.log("Viewing user:", emp_id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Onboarded Users</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="border p-3">Employee ID</th>
              <th className="border p-3">Emp Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Role ID</th>
              <th className="border p-3">Department ID</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Notes</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => {
                const isEditing = editingEmpId === user.emp_id;
                return (
                  <tr
                    key={user.emp_id}
                    className="border hover:bg-gray-100 odd:bg-gray-50 even:bg-white"
                  >
                    {["emp_id", "emp_name", "email", "role_id", "department_id", "is_allowed", "notes"].map((field) => (
                      <td className="border p-3" key={field}>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedUser[field]}
                            onChange={(e) => handleChange(e, field)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : field === "is_allowed" ? (
                          user[field] ? "Active" : "Inactive"
                        ) : (
                          user[field]
                        )}
                      </td>
                    ))}
                    <td className="border p-3 text-center flex items-center justify-center space-x-2">
                      <IconButton onClick={() => handleView(user.emp_id)} title="View" color="primary">
                        <VisibilityIcon />
                      </IconButton>
                      {isEditing ? (
                        <IconButton onClick={handleSave} title="Save" sx={{ color: "green" }}>
                          <SaveIcon />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => handleEditClick(user)} title="Edit" sx={{ color: "orange" }}>
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton onClick={() => handleDelete(user.emp_id)} title="Delete" sx={{ color: "red" }}>
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-600">
                  No users onboarded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usersonboard;
