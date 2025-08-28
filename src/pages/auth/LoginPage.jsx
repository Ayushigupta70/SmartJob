import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box, Card, CardContent, TextField, Button, Typography,
  Alert, Container, Grid, IconButton, InputAdornment, MenuItem
} from "@mui/material";
import { Visibility, VisibilityOff, Work } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slice/RegisterSlice";
import "./AuthPages.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: ""   
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting login:", formData); // log formData
    dispatch(loginUser(formData))
        .unwrap()
        .then((res) => console.log("Login response:", res))
        .catch((err) => console.error("Login failed:", err));
};


  return (
    <Box className="auth-background">
      <Container maxWidth="lg">
        <Grid container spacing={0} sx={{ minHeight: "100vh", alignItems: "center" }}>
          {/* Left Branding */}
          <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
            <Box sx={{ padding: 4, color: "white" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Work sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h3" fontWeight="bold">SmartJob</Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                Welcome back to your recruiting hub
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                Streamline your hiring process with our recruiter dashboard.
              </Typography>
            </Box>
          </Grid>

          {/* Login Form */}
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 4, display: "flex", justifyContent: "center" }}>
              <Card sx={{ width: "100%", maxWidth: 400, boxShadow: 4 }}>
                <CardContent sx={{ padding: 4 }}>
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                    Sign in to your account
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Enter your credentials to access your recruiter dashboard
                  </Typography>

                  {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                  <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      margin="normal"
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      select
                      fullWidth
                      label="Role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      margin="normal"
                      required
                    >
                      <MenuItem value="Recruiter">Recruiter</MenuItem>
                      <MenuItem value="Admin">Admin</MenuItem>
                    </TextField>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading}
                      sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </Button>

                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="body2" color="text.secondary">
                        Don't have an account?{" "}
                        <Link
                          to="/register"
                          style={{ color: "#6366f1", textDecoration: "none", fontWeight: 600 }}
                        >
                          Sign up here
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

export default LoginPage;
