import api from "api/api";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Loader state

  const fetchUsers = async () => {
    setLoading(true); // Start loading
    try {
      const response = await api.get("/users");
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        console.error("Failed to fetch users, status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleGenerateAccess = (userId) => {
    alert(`Generate Access clicked for user ${userId}`);
  };

  const handleGenerateBlock = (userId) => {
    alert(`Generate Block clicked for user ${userId}`);
  };

  const addBorderRight = (index, totalColumns) =>
    index < totalColumns - 1 ? "border-r border-gray-300" : "";

  const columns = [
    "User ID",
    "Emp ID",
    "Department ID",
    "Role ID",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Action",
  ];

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-indigo-900 mb-8 tracking-wide drop-shadow-md">
        Users List
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white border border-gray-200">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-600 border-opacity-70"></div>
            <span className="ml-4 text-indigo-600 font-medium text-lg">Loading users...</span>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-600">
              <tr>
                {columns.map((heading, i) => (
                  <th
                    key={heading}
                    scope="col"
                    className={`px-6 py-3 text-left text-xs font-semibold text-indigo-100 uppercase tracking-wider select-none ${addBorderRight(
                      i,
                      columns.length
                    )}`}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.length > 0 ? (
                users.map((user, idx) => (
                  <tr
                    key={user.user_id}
                    className={
                      idx % 2 === 0
                        ? "bg-indigo-50 hover:bg-indigo-100 transition-colors"
                        : "bg-white hover:bg-indigo-100 transition-colors"
                    }
                  >
                    {[
                      user.user_id,
                      user.emp_id,
                      user.department_id,
                      user.role_id,
                      user.first_name,
                      user.last_name,
                      <span
                        key="email"
                        className="underline hover:text-indigo-900 cursor-pointer text-indigo-700 text-sm"
                      >
                        {user.email}
                      </span>,
                      user.phone || "-",
                      <div key="actions" className="space-x-2">
                        <button
                          onClick={() => handleGenerateAccess(user.user_id)}
                          className="px-3 py-1 rounded-md bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition"
                        >
                          Trigger Token
                        </button>
                        <button
                          className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs font-semibold hover:bg-red-700 transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleGenerateBlock(user.user_id)}
                          className="px-3 py-1 rounded-md bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
                        >
                          Block
                        </button>
                      </div>,
                    ].map((cell, i) => (
                      <td
                        key={i}
                        className={`px-6 py-4 whitespace-nowrap text-sm ${
                          i === 0 || i === 4 || i === 5
                            ? "font-semibold text-indigo-900"
                            : "text-indigo-800"
                        } ${addBorderRight(i, columns.length)}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-8 text-indigo-500 text-lg font-medium"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
