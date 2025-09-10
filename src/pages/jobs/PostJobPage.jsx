import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
} from "@mui/material";
import { ArrowBack, Save } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createJob, updateJob } from "../../slice/JobSlice";

const PostJobPage = ({ editMode = false, existingJob = {}, onUpdate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Get today in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const [jobData, setJobData] = useState({
    jobTitle: "",
    jobDescription: "",
    requiredSkillandQualification: "",
    minimumSalary: "",
    maximumSalary: "",
    jobType: "",
    experienceLevel: "",
    location: "",
    skill: [],
    postingDate: today, // ✅ Always today's date
    applicationDeadline: "",
    ...existingJob,
  });

  const [skillInput, setSkillInput] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      const trimmedSkill = skillInput.trim();
      if (!jobData.skill.includes(trimmedSkill)) {
        setJobData((prevData) => ({
          ...prevData,
          skill: [...prevData.skill, trimmedSkill],
        }));
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setJobData((prevData) => ({
      ...prevData,
      skill: prevData.skill.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateJob(jobData));
      if (onUpdate) onUpdate(jobData);
    } else {
      dispatch(createJob(jobData));
    }
    setSuccess(true);
    setTimeout(() => navigate("/jobs"), 2000);
  };

  return (
    <Box>
      {/* Top Heading */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/jobs")}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {editMode ? "Edit Job" : "Post New Job"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {editMode
              ? "Update job details and save changes."
              : "Create a detailed job posting to attract the right candidates"}
          </Typography>
        </Box>
      </Box>

      {/* Success Alert */}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {editMode ? "Job updated successfully!" : "Job posted successfully!"}
        </Alert>
      )}

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Job Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="jobTitle"
                  value={jobData.jobTitle}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              {/* Job Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Job Description"
                  name="jobDescription"
                  value={jobData.jobDescription}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              {/* Required Skills & Qualifications */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Required Skills & Qualifications"
                  name="requiredSkillandQualification"
                  value={jobData.requiredSkillandQualification}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              {/* Skills */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Skills (Press Enter to add)"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                />
                <Box
                  sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}
                >
                  {jobData.skill.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      onDelete={() => handleRemoveSkill(skill)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>

              {/* Salary */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Minimum Salary"
                  name="minimumSalary"
                  type="number"
                  value={jobData.minimumSalary}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Maximum Salary"
                  name="maximumSalary"
                  type="number"
                  value={jobData.maximumSalary}
                  onChange={handleInputChange}
                />
              </Grid>

              {/* Job Type */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Job Type</InputLabel>
                  <Select
                    name="jobType"
                    value={jobData.jobType}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Full-time">Full-time</MenuItem>
                    <MenuItem value="Part-time">Part-time</MenuItem>
                    <MenuItem value="Contract">Contract</MenuItem>
                    <MenuItem value="Internship">Internship</MenuItem>
                    <MenuItem value="Remote">Remote</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Experience Level */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Experience Level</InputLabel>
                  <Select
                    name="experienceLevel"
                    value={jobData.experienceLevel}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Fresher">Fresher</MenuItem>
                    <MenuItem value="Junior">Junior</MenuItem>
                    <MenuItem value="Mid">Mid</MenuItem>
                    <MenuItem value="Senior">Senior</MenuItem>
                    <MenuItem value="Lead">Lead</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Location */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={jobData.location}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              {/* Posting Date (Fixed to Today) */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Posting Date"
                  name="postingDate"
                  value={jobData.postingDate}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ readOnly: true }} // ✅ Can't change
                />
              </Grid>

              {/* Application Deadline (After Today) */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Application Deadline"
                  name="applicationDeadline"
                  InputLabelProps={{ shrink: true }}
                  value={jobData.applicationDeadline}
                  onChange={handleInputChange}
                  inputProps={{ min: today }} // ✅ No past date
                  required
                />
              </Grid>

              {/* Buttons */}
              <Grid item xs={12}>
                <Box
                  sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/jobs")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    size="large"
                  >
                    {editMode ? "Update Job" : "Post Job"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostJobPage;
