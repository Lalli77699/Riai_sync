import React, { useState } from "react";
import { TextField, Chip, Button, Autocomplete } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

const allRecipients = [
];

const LeaveRequestEmail = () => {
  const [toRecipients, setToRecipients] = useState([]);
  const [ccRecipients, setCcRecipients] = useState([]);

  const handleAddRecipient = (event, newValue, type) => {
    if (type === "to") setToRecipients(newValue);
    if (type === "cc") setCcRecipients(newValue);
  };

  const handleDeleteRecipient = (recipient, type) => {
    if (type === "to") setToRecipients(toRecipients.filter((r) => r !== recipient));
    if (type === "cc") setCcRecipients(ccRecipients.filter((r) => r !== recipient));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-lg bg-white space-y-4">
      {/* Send Button */}
      <div className="flex justify-between items-center">
        <Button variant="contained" color="primary" endIcon={<SendIcon />}>
          Send
        </Button>
      </div>

      {/* To Field */}
      <div>
        <span className="text-gray-700 font-medium">To</span>
        <Autocomplete
          multiple
          freeSolo
          filterSelectedOptions
          options={allRecipients}
          value={toRecipients}
          onChange={(event, newValue) => handleAddRecipient(event, newValue, "to")}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={option}
                label={option}
                {...getTagProps({ index })}
                onDelete={() => handleDeleteRecipient(option, "to")}
                deleteIcon={<CloseIcon />}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" placeholder="Add recipients" fullWidth />
          )}
        />
      </div>

      {/* CC Field */}
      <div>
        <span className="text-gray-700 font-medium">CC</span>
        <Autocomplete
          multiple
          freeSolo
          filterSelectedOptions
          options={allRecipients}
          value={ccRecipients}
          onChange={(event, newValue) => handleAddRecipient(event, newValue, "cc")}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={option}
                label={option}
                {...getTagProps({ index })}
                onDelete={() => handleDeleteRecipient(option, "cc")}
                deleteIcon={<CloseIcon />}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" placeholder="Add CC recipients" fullWidth />
          )}
        />
      </div>

      {/* Subject Field */}
      <TextField fullWidth variant="outlined" label="Subject" defaultValue="Leave Request" />

      {/* Email Body */}
      <TextField fullWidth variant="outlined" multiline rows={6} placeholder="Type your leave request here..." />
    </div>
  );
};

export default LeaveRequestEmail;
