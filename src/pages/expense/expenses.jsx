import { useState, useEffect } from "react";
import { Add } from "@mui/icons-material";
import Table from "./table";
import RecordModal from "pages/Record";


const Expenses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const savedRecords = JSON.parse(localStorage.getItem("expenseRecords")) || [];
    setRecords(savedRecords);
  }, []);

  const addNewRecord = (newRecord) => {
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    localStorage.setItem("expenseRecords", JSON.stringify(updatedRecords));
  };

  return (
    <div className="relative p-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-600 transition"
      >
        <Add /> Add Record
      </button>

      {/* Pass records and setRecords to Table */}
      <Table records={records} setRecords={setRecords} />

      {/* Record Modal */}
      <RecordModal open={isModalOpen} setOpen={setIsModalOpen} addNewRecord={addNewRecord} />
    </div>
  );
};

export default Expenses;
