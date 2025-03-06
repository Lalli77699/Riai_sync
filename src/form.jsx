import React from "react";
import SidenavLayout from "sidenavs/sidenavlayout";

const Form = () => {
  return (
    <SidenavLayout>
      <div className="flex justify-center items-center">
        <div className="bg-white w-[40vw] h-[90vh] p-6 rounded shadow-[0_4px_6px_rgba(128,128,128,0.5)] flex flex-col">
          
          <h2 className="text-xl font-bold mb-4 text-center">Employee Onboarding Form</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label htmlFor="employeeName" className="font-bold mb-2">
                Employee Name
              </label>
              <input
                id="employeeName"
                type="text"
                placeholder="Enter employee name"
                className="border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="employeeId" className="font-bold mb-2">
                Employee ID
              </label>
              <input
                id="employeeId"
                type="text"
                placeholder="Enter employee ID"
                className="border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="font-bold mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email id"
                className="border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="department" className="font-bold mb-2">
                Department
              </label>
              <div className="relative">
                <select
                  id="department"
                  className="appearance-none border border-gray-300 p-2 rounded w-full focus:border-blue-500 focus:ring focus:ring-blue-300 pr-10"
                  defaultValue=""
                >
                  <option value="" disabled>Select department</option>
                  <option value="HR">HR</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Manager">Manager</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center justify-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mb-4 relative">
            <label htmlFor="position" className="font-bold mb-2">
              Position
            </label>
            <div className="relative">
              <select
                id="position"
                className="appearance-none border border-gray-300 p-2 rounded w-full focus:border-blue-500 focus:ring focus:ring-blue-300 pr-10"
                defaultValue=""
              >
                <option value="" disabled>Select position</option>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center justify-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="note" className="font-bold mb-2">
              Note
            </label>
            <textarea
              id="note"
              placeholder="Enter your note"
              className="border border-gray-300 p-2 rounded resize-none h-32 focus:border-blue-500 focus:ring focus:ring-blue-300"
            ></textarea>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded">
              Onboarding Employee
            </button>
          </div>
        </div>
      </div>
    </SidenavLayout>
  );
};

export default Form;
