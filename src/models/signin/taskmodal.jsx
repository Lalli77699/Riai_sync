import React, { useState } from "react";

const Taskmodal = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    company: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    setOpen(false);
  };

  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
          <h2 className="text-xl font-semibold mb-4">What are you working on?</h2>
          <div className="space-y-4">
            <input
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Project Name"
              className="w-full p-2 border rounded-md"
            />
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full p-2 border rounded-md"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
            <button
              onClick={() => setOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Taskmodal;
