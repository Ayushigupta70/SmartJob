import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import { Edit, Save, Cancel, Person } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext.jsx';

const ProfilePage = () => {
  const { user, setUser } = useAuth(); // make sure setUser is provided in AuthContext
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user || {});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData); // update user in context
    setEditMode(false);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Recruiter Profile
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your profile information and company details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mr: 3,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}
                >
                  {formData?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  {editMode ? (
                    <>
                      <TextField
                        name="fullName"
                        label="Full Name"
                        value={formData.fullName || ""}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        name="Company"
                        label="companyName"
                        value={formData.companyName || ""}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        name="role"
                        label="Role"
                        value={formData.role || ""}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        name="email"
                        label="Email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        fullWidth
                      />
                    </>
                  ) : (
                    <>
                      <Typography variant="h5" fontWeight="bold">
                        {user?.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {user?.role} at {user?.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user?.email}
                      </Typography>
                    </>
                  )}
                </Box>
                {editMode ? (
                  <>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSave}
                      sx={{ mr: 1 }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Profile Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This section will contain editable profile information including logo,
                description, and industry details as mentioned in the requirements.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Person sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Company Verification
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Upload documents for company verification
              </Typography>
              <Button variant="contained" fullWidth>
                Verify Company
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
