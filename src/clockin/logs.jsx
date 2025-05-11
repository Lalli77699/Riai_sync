import React, { useState } from "react";
import { AccessTime } from "@mui/icons-material";
import Logsmodal from "./logsmodal";

const Logs = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-white shadow-md p-4 my-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="text-blue-500">
              <AccessTime />
            </button>
            <p className="text-gray-700 text-sm md:text-base font-semibold">
              You are yet to submit your time logs today!
            </p>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
            onClick={handleOpenModal}
          >
            Log Time
          </button>
        </div>
      </div>

      {showModal && <Logsmodal onClose={handleCloseModal} />}
    </>
  );
};

export default Logs;
