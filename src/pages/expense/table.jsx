import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Table = ({ records, setRecords }) => {
  const handleDelete = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
    localStorage.setItem("expenseRecords", JSON.stringify(updatedRecords));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Expense Records</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-3">Employee ID</th>
              <th className="border p-3">Expenses</th>
              <th className="border p-3">Amount</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Date</th>
              <th className="border p-3">Department</th>
              <th className="border p-3">Note</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record, index) => (
                <tr key={index} className="border hover:bg-gray-100 odd:bg-gray-50 even:bg-white">
                  <td className="border p-3">{record.employeeId}</td>
                  <td className="border p-3">{record.expenses}</td>
                  <td className="border p-3">${record.amount}</td>
                  <td className={`border p-3 font-semibold ${record.status === "Approved" ? "text-green-600" : "text-red-600"}`}>
                    {record.status}
                  </td>
                  <td className="border p-3">{record.date}</td>
                  <td className="border p-3">{record.department}</td>
                  <td className="border p-3">{record.note}</td>
                  <td className="border p-3 flex justify-center">
                    <IconButton onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-800">
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-600">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
