import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import Upload from "./forms/upload";
import Poll from "./forms/poll";

const MenuCard = () => {
  const [value, setValue] = useState(0);
  const [showUpload, setShowUpload] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setShowUpload(false); 
  };

  const handleMouseLeave = () => {
    setShowUpload(false);
    setValue(0);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 w-full" 
      onMouseLeave={handleMouseLeave}
    >
      <Tabs 
        value={value} 
        onChange={handleChange} 
        variant="fullWidth" 
        textColor="primary" 
        indicatorColor="primary"
      >
        <Tab label="Post" />
        <Tab label="Task" />
        <Tab label="Poll" />
      </Tabs>
      <Box p={2} className="text-gray-700">
        {value === 0 && !showUpload && (
          <div 
            className="text-center text-lg cursor-pointer" 
            onClick={() => setShowUpload(true)}
          >
            Enter...
          </div>
        )}
        {showUpload && <Upload />}
        {value === 2 && <Poll />} 
      </Box>
    </div>
  );
};

export default MenuCard;