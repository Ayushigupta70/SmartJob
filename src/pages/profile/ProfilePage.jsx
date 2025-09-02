import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { Edit, Save, Cancel, Person, Upload } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { updateRecruiterProfile } from "../../slice/RegisterSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.users);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user || {});
  const [preview, setPreview] = useState(user?.photo || "");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 // Save profile update
const handleSave = () => {
  const formDataToSend = new FormData();

  // Append text fields
  Object.keys(formData).forEach((key) => {
    if (key !== "photo") {
      formDataToSend.append(key, formData[key]);
    }
  });

  // Append photo if exists (only File, not Base64)
  if (formData.photo instanceof File) {
    formDataToSend.append("photo", formData.photo);
  }

  dispatch(updateRecruiterProfile(formDataToSend)).then((res) => {
    if (!res.error) {
      setEditMode(false);
    }
  });
};


  // Handle photo preview (local only – upload logic can be added later)
 const handlePhotoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFormData({ ...formData, photo: file }); // store file object
    setPreview(URL.createObjectURL(file)); // preview
  }
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
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Box sx={{ position: "relative", mr: 3 }}>
<Avatar
  src={editMode ? preview : user?.photo}
  sx={{
    width: 80,
    height: 80,
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    fontSize: "2rem",
    fontWeight: "bold",
  }}
>
  {!user?.photo && formData?.fullName?.charAt(0)?.toUpperCase()}
</Avatar>
                  {editMode && (
                    <label htmlFor="upload-photo">
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="upload-photo"
                        type="file"
                        onChange={handlePhotoChange}
                      />
                      <Button
                        component="span"
                        size="small"
                        startIcon={<Upload />}
                        sx={{ mt: 1 }}
                      >
                        Upload Photo
                      </Button>
                    </label>
                  )}
                </Box>

                {/* Editable Info */}
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
                        name="companyName"
                        label="Company Name"
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
                        sx={{ mb: 2}}
                      />
                      <TextField
                        name="email"
                        label="Email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        fullWidth
                        sx={{mb:2}}
                      />
                      <TextField
                        name="phoneNumber"
                        label="Phone Number"
                        value={formData.phoneNumber || ""}
                        onChange={handleChange}
                        fullWidth
                      />
                    </>
                  ) : (
                    <>
                      <Typography variant="h5" fontWeight="bold">
                        {user?.fullName}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {user?.role} at {user?.companyName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user?.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user?.phoneNumber}
                      </Typography>
                    </>
                  )}
                </Box>
                {/* Actions */}
                {editMode ? (
                  <>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSave}
                      disabled={loading}
                      sx={{ mr: 1}}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      size="small" 
                      sx={{ minWidth: 100, fontSize: "0.9rem", textTransform: "none" }}
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
                This section will contain editable profile information including
                logo, description, and industry details.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Right-side Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: 3, textAlign: "center" }}>
              <Person sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Company Verification
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
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
