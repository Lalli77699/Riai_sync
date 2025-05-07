import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Details from './details'; // Make sure this path is correct

const Project = () => {
  const [viewArchived, setViewArchived] = useState(false);
  const [viewSelected, setViewSelected] = useState(false);
  const [creatingProject, setCreatingProject] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Acme Corp',
      progress: 70,
      createdOn: '2025-05-01',
      description:
        'This project is aimed at developing a new feature set for enterprise clients.',
      archived: false,
    },
    {
      id: 2,
      name: 'Skyline Ventures',
      progress: 45,
      createdOn: '2025-04-15',
      description:
        'Building a new investor dashboard with real-time analytics and reporting features.',
      archived: false,
    },
    {
      id: 3,
      name: 'Nimbus AI',
      progress: 85,
      createdOn: '2025-03-28',
      description:
        'Developing a machine learning model to improve fraud detection accuracy.',
      archived: false,
    },
    {
      id: 4,
      name: 'Quantum Grid',
      progress: 30,
      createdOn: '2025-02-10',
      description:
        'Early-stage planning of a decentralized energy trading platform.',
      archived: false,
    },
  ]);
  const [editedDescription, setEditedDescription] = useState('');

  const handleArchive = (id) => {
    setProjects((prev) =>
      prev.map((proj) =>
        proj.id === id ? { ...proj, archived: true } : proj
      )
    );
  };

  const handleEdit = (project) => {
    setEditProjectId(project.id);
    setEditedDescription(project.description);
  };

  const handleSave = (id) => {
    setProjects((prev) =>
      prev.map((proj) =>
        proj.id === id ? { ...proj, description: editedDescription } : proj
      )
    );
    setEditProjectId(null);
    setEditedDescription('');
  };

  const filteredProjects = projects.filter(
    (proj) => proj.archived === viewArchived
  );

  return (
    <div className="p-6 space-y-6">
      {/* Top Buttons */}
      <div className="flex justify-start">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disableElevation
          onClick={() => {
            setCreatingProject(true);
            setViewSelected(false);
          }}
          className="!bg-blue-600 hover:!bg-blue-700 text-white normal-case"
        >
          Create Project
        </Button>
      </div>

      {/* View toggle buttons */}
      {!creatingProject && (
        <div className="flex gap-4">
          <Button
            variant="contained"
            startIcon={<FolderOpenIcon />}
            disableElevation
            onClick={() => {
              setViewArchived(false);
              setViewSelected(true);
            }}
            className="!bg-gray-700 hover:!bg-gray-800 text-white normal-case"
          >
            All Projects
          </Button>
          <Button
            variant="contained"
            startIcon={<ArchiveIcon />}
            disableElevation
            onClick={() => {
              setViewArchived(true);
              setViewSelected(true);
            }}
            className="!bg-gray-700 hover:!bg-gray-800 text-white normal-case"
          >
            Archived
          </Button>
        </div>
      )}

      {/* Details Modal */}
      <Details
        open={creatingProject}
        onClose={() => {
          setCreatingProject(false);
          setViewSelected(true);
        }}
      />

      {/* Main View Logic */}
      {viewSelected && filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
          <Card key={project.id} className="shadow-md">
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <Typography variant="h6" className="text-gray-800">
                  Project: <span className="font-semibold">{project.name}</span>
                </Typography>

                <div className="flex items-center gap-2">
                  <Typography className="text-sm text-gray-600">Progress:</Typography>
                  <div className="w-32">
                    <LinearProgress variant="determinate" value={project.progress} />
                  </div>
                  <Typography className="text-sm text-gray-600">
                    {project.progress}%
                  </Typography>
                </div>

                <Typography className="text-sm text-gray-600">
                  Created On: {project.createdOn}
                </Typography>
              </div>

              {/* Description */}
              {editProjectId === project.id ? (
                <textarea
                  rows={3}
                  className="w-full border p-2 rounded-md"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              ) : (
                <Typography className="text-gray-700 whitespace-pre-wrap">
                  {project.description}
                </Typography>
              )}

              <div className="flex justify-between flex-wrap gap-4">
                <div className="flex gap-3">
                  <Button
                    variant="outlined"
                    className="normal-case border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    View Epics
                  </Button>

                  {!project.archived && (
                    <Button
                      variant="outlined"
                      startIcon={<ArchiveIcon />}
                      onClick={() => handleArchive(project.id)}
                      className="normal-case border-yellow-600 text-yellow-600 hover:bg-yellow-50"
                    >
                      Mark as Archived
                    </Button>
                  )}
                </div>

                {editProjectId === project.id ? (
                  <Button
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    onClick={() => handleSave(project.id)}
                    className="normal-case border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(project)}
                    className="normal-case border-gray-600 text-gray-600 hover:bg-gray-100"
                  >
                    Edit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      ) : viewSelected ? (
        <Typography className="text-gray-600">No projects found.</Typography>
      ) : null}
    </div>
  );
};

export default Project;
