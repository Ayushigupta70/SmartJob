import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box, Card, CardContent, TextField, Button, Typography,
  Alert, Container, Grid, IconButton, InputAdornment,
  FormControlLabel, Checkbox, MenuItem
} from "@mui/material";
import { Visibility, VisibilityOff, Work } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetSuccess } from "../../slice/RegisterSlice";
import "./AuthPages.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.users || {});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    location: "",
    phoneNumber: "",
    role: "",
    acceptTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  // ✅ Password strength checker
  const checkPasswordStrength = (password) => {
    if (!password) return "";
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);
    const isLongEnough = password.length >= 8;

    if (isLongEnough && hasUpper && hasLower && hasNumber && hasSpecial) {
      return "Strong";
    } else if (
      password.length >= 6 &&
      ((hasUpper && hasLower) || (hasNumber && hasSpecial))
    ) {
      return "Medium";
    } else {
      return "Weak";
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(registerUser(formData));
  };

  // ✅ Navigate when register is successful
  useEffect(() => {
    if (success) {
      // Wait 2 seconds before redirect to show success message
      const timer = setTimeout(() => {
        navigate("/dashboard");
        dispatch(resetSuccess());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate, dispatch]);

  return (
    <Box className="auth-background">
      <Container maxWidth="lg">
        <Grid container spacing={0} sx={{ minHeight: "100vh", alignItems: "center", py: 4 }}>
          {/* Branding Section */}
          <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
            <Box sx={{ padding: 4, color: "white" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Work sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h3" fontWeight="bold">
                  SmartJob
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                Recruit Smarter, Hire Faster 🚀
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                Create your recruiter account today and join thousands building their dream teams.
              </Typography>
            </Box>
          </Grid>

          {/* Register Form */}
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 4, display: "flex", justifyContent: "center" }}>
              <Card sx={{ width: "100%", maxWidth: 550, boxShadow: 5, borderRadius: 3 }}>
                <CardContent sx={{ padding: 4 }}>
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                    Create Your Account
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Fill in your details to get started
                  </Typography>

                  {/* ✅ Show error message */}
                  {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                  {/* ✅ Show success message */}
                  {success && <Alert severity="success" sx={{ mb: 2 }}>Account created successfully! 🎉 Redirecting...</Alert>}

                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      {/* Personal Info */}
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                      </Grid>

                      {/* Company Info */}
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} required />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} required />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          select
                          fullWidth
                          label="Role"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          required
                        >
                          <MenuItem value="Recruiter">Recruiter</MenuItem>
                          <MenuItem value="Admin">Admin</MenuItem>
                        </TextField>
                      </Grid>

                      {/* Passwords */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          required
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        {formData.password && (
                          <Typography
                            variant="caption"
                            sx={{
                              color:
                                passwordStrength === "Strong"
                                  ? "green"
                                  : passwordStrength === "Medium"
                                    ? "orange"
                                    : "red",
                            }}
                          >
                            {`Password: ${passwordStrength}`}
                          </Typography>
                        )}
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Confirm Password"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>

                    {/* Terms */}
                    <FormControlLabel
                      control={<Checkbox name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} color="primary" />}
                      label="I agree to the Terms & Privacy Policy"
                      sx={{ mt: 2 }}
                    />

                    {/* Submit */}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      // disabled={loading || !formData.acceptTerms}
                      sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                      { "Create Account"}
                    </Button>

                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="body2" color="text.secondary">
                        Already have an account?{" "}
                        <Link to="/login" style={{ color: "#6366f1", textDecoration: "none", fontWeight: 600 }}>
                          Sign in here
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RegisterPage;
