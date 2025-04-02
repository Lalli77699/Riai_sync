import React, { useState } from "react";
import { CloudUpload } from "@mui/icons-material";
import { Button, TextField, CardContent, Switch } from "@mui/material";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [comment, setComment] = useState("");

  const handleFileChange = (event) => setFile(event.target.files[0]);
  const toggleComments = () => setCommentsEnabled(!commentsEnabled);
  const handleCommentSubmit = () => {
    if (comment) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <CardContent>
      <div className="mb-4 text-start">
        <input type="file" onChange={handleFileChange} className="hidden" id="upload-button" />
        <label htmlFor="upload-button" className="cursor-pointer flex items-center justify-end gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
          <CloudUpload /> Upload Photo
        </label>
        {file && <p className="mt-2 text-sm text-gray-600">Selected: {file.name}</p>}
      </div>

      <TextField
        label="Write your thoughts..."
        variant="outlined"
        multiline
        rows={3}
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4"
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Turn on Comments</span>
          <Switch checked={commentsEnabled} onChange={toggleComments} color="primary" />
        </div>
      </div>

      <div>
        <div className="flex justify-end gap-2">
          <Button onClick={() => setComment("")} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCommentSubmit} variant="contained" color="primary" className="bg-blue-500">
            Post
          </Button>
        </div>
        <div className="mt-4 space-y-2">
          {comments.map((c, index) => (
            <p key={index} className="border-b py-1 text-gray-700">{c}</p>
          ))}
        </div>
      </div>
    </CardContent>
  );
};

export default Upload;
