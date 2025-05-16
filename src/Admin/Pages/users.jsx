import api from "api/api";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users");
      const tokenResp = await api.get("/access-tokens/getall");
      if (tokenResp.status === 200) {
        setTokens(tokenResp?.data?.data || []);
      }
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        console.error("Failed to fetch users:", response.status);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const findTokenForUser = (empId) => {
    return tokens.find((token) => token.emp_id === empId);
  };

  const isTokenExpired = (expiresAt) => {
    return new Date(expiresAt) < new Date();
  };

  const handleGenerateAccess = async(user) => {
 try {
const response=await api.post('/access-tokens/',{
  email:user?.email,
  emp_id: user.emp_id?.toString()
})
if(response.status==200){
  alert('genrated sucessfully')
  fetchUsers()
}
 } catch (error) {
  
 }finally{

 }
  };
  const handleReGenerateAccess = async(user) => {
 try {
const response=await api.put('/access-tokens/',{
  email:user?.email,
  emp_id: user.emp_id?.toString()
})
if(response.status==200){
  alert('regenrated sucessfully')
  fetchUsers()
}
 } catch (error) {
  
 }finally{

 }
  };
  const handleGenerateBlock = async(token) => {
try {
  const response =await api.delete(`/access-tokens/${token}`)
  if(response.status==200){
    fetchUsers()
    alert('user blocked sucessfully ')
  }
} catch (error) {
  console.log(error)
}
  };

  const handleViewToken = (token) => {
    setSelectedToken(token);
    setIsModalOpen(true);
  };
    const handleCopyToken = () => {
    if (selectedToken) {
      navigator.clipboard.writeText(selectedToken.token);
      alert("Token copied to clipboard!");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedToken(null);
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
                users.map((user, idx) => {
                  const token = findTokenForUser(user.emp_id);
                  const tokenExpired = token ? isTokenExpired(token.expires_at) : false;

                  return (
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
                          {!token && (
                            <button
                              onClick={() => handleGenerateAccess(user)}
                              className="px-3 py-1 rounded-md bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition"
                            >
                              Generate Token
                            </button>
                          )}
                          {token && tokenExpired && (
                            <button
                              onClick={() => handleReGenerateAccess(user)}
                              className="px-3 py-1 rounded-md bg-yellow-500 text-white text-xs font-semibold hover:bg-yellow-600 transition"
                            >
                              Regenerate Token
                            </button>
                          )}
                          {token && (
                            <>
                              <button
                                onClick={() => handleViewToken(token)}
                                className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleGenerateBlock(token?.token)}
                                className="px-3 py-1 rounded-md bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
                              >
                                Block
                              </button>
                            </>
                          )}
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
                  );
                })
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

      {/* Modal for viewing token */}
      {isModalOpen && selectedToken && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-lg"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-indigo-700 mb-4">Access Token</h3>
            <div className="mb-2">
              <span className="font-semibold">Token:</span>
              <p className="text-sm break-words mt-1 bg-gray-100 p-2 rounded">{selectedToken.token}</p>
               <button
                onClick={handleCopyToken}
                className="ml-3 text-indigo-600 hover:text-indigo-900"
                title="Copy token"
                aria-label="Copy token"
              >
                {/* Copy icon (SVG) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16h8a2 2 0 002-2v-6a2 2 0 00-2-2h-8a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12H8"
                  />
                </svg>
              </button>
            </div>
            <div className="text-sm mt-4">
              <p><strong>Email:</strong> {selectedToken.email}</p>
              <p><strong>Created At:</strong> {new Date(selectedToken.created_at).toLocaleString()}</p>
              <p><strong>Expires At:</strong> {new Date(selectedToken.expires_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
