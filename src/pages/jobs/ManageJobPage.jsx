import React, { useEffect } from "react";
import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip,
  IconButton, Tooltip, CircularProgress
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, deleteJob } from "../../slice/JobSlice";

const ManageJobsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs2, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteJob(id));
    alert(`Delete job with ID: ${id} (API call pending)`);
    dispatch(fetchJobs());
  };

  const handleEdit = (id) => {
    navigate(`/jobs/edit/${id}`);
  };

  // ✅ Format dates nicely
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ✅ Truncate text helper
  const truncateText = (text, wordLimit = 5) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  // ✅ Determine if job is expired
  const getJobStatus = (job) => {
    const today = new Date();
    const deadline = new Date(job.applicationDeadline);

    if (deadline < today) {
      return "Expired";
    }
    return job.status || "Active";
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Manage Job Listings
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Edit or remove existing job postings
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={5}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Location</strong></TableCell>
                <TableCell><strong>Salary</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>Experience</strong></TableCell>
                <TableCell><strong>Skills</strong></TableCell>
                <TableCell><strong>Deadline</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs2.length > 0 ? (
                jobs2.map((job) => {
                  const jobStatus = getJobStatus(job);
                  return (
                    <TableRow key={job._id || job.id}>
                      <TableCell>{job.jobTitle}</TableCell>
                      <TableCell>{truncateText(job.jobDescription, 10)}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>₹{job.minimumSalary} - ₹{job.maximumSalary}</TableCell>
                      <TableCell>{job.jobType}</TableCell>
                      <TableCell>{job.experienceLevel}</TableCell>
                      <TableCell>
                        {job.skill?.slice(0, 3).map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                        {job.skill?.length > 3 && <span>...</span>}
                      </TableCell>
                      <TableCell>{formatDate(job.applicationDeadline)}</TableCell>
                      <TableCell>
                        <Chip
                          label={jobStatus}
                          size="small"
                          sx={{
                            backgroundColor:
                              jobStatus.toLowerCase() === "active" ? "#1976d2" : "#d32f2f",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        />
                      </TableCell>
                      
                      <TableCell align="center">
                        <Tooltip title="Edit">
                          <IconButton color="primary" onClick={() => handleEdit(job._id || job.id)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton color="error" onClick={() => handleDelete(job._id || job.id)}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    No jobs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ManageJobsPage;
