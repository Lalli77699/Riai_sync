import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Chip,
  Box,
  MenuItem,
  Stack,
  InputAdornment,
} from '@mui/material';

const Details = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleSubmit = () => {
    if (!name || !description || !assignedTo || !priority) {
      return alert('Please fill out all required fields.');
    }

    const newProject = {
      id: Date.now(),
      name,
      description,
      assignedTo,
      tags,
      deadline,
      priority,
      createdOn: new Date().toISOString().split('T')[0],
      archived: false,
      progress: 0,
    };

    onSave(newProject);
    // Reset fields
    setName('');
    setDescription('');
    setAssignedTo('');
    setTags([]);
    setTagInput('');
    setDeadline('');
    setPriority('');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Create New Project</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={3} mt={1}>
          <TextField
            label="Project Name"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            required
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Assigned To"
            fullWidth
            required
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
          <Box>
            <TextField
              label="Add Tag"
              fullWidth
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    Press Enter
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  color="primary"
                />
              ))}
            </Stack>
          </Box>
          <TextField
            label="Deadline"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <TextField
            label="Priority"
            select
            fullWidth
            required
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={onClose} color="error" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Details;
