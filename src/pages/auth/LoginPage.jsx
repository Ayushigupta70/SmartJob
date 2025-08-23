import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Grid,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Work,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext.jsx';
import './AuthPages.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, debugLocalStorage, getRegisteredUsers } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showDebug, setShowDebug] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Enhanced validation
    if (!formData.email?.trim()) {
      setError('Email address is required');
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed. Please check your credentials and try again.');
    }

    setLoading(false);
  };

  return (
    <Box className="auth-background">
      <Container maxWidth="lg">
        <Grid container spacing={0} sx={{ minHeight: '100vh', alignItems: 'center' }}>
          {/* Left Side - Branding */}
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ padding: 4, color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Work sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h3" fontWeight="bold">
                  SmartJob
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                Welcome back to your recruiting hub
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                Streamline your hiring process with our comprehensive recruiter dashboard.
                Manage job postings, track candidates, and schedule interviews all in one place.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ background: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 2, minWidth: 200 }}>
                  <Typography variant="h6" fontWeight="bold">Post Jobs</Typography>
                  <Typography variant="body2">Create and manage job listings</Typography>
                </Box>
                <Box sx={{ background: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 2, minWidth: 200 }}>
                  <Typography variant="h6" fontWeight="bold">Find Candidates</Typography>
                  <Typography variant="body2">Search and filter candidates</Typography>
                </Box>
                <Box sx={{ background: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 2, minWidth: 200 }}>
                  <Typography variant="h6" fontWeight="bold">Schedule Interviews</Typography>
                  <Typography variant="body2">Manage your interview calendar</Typography>
                </Box>
                <Box sx={{ background: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 2, minWidth: 200 }}>
                  <Typography variant="h6" fontWeight="bold">Track Applications</Typography>
                  <Typography variant="body2">Monitor application progress</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Login Form */}
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ width: '100%', maxWidth: 400, boxShadow: 4 }}>
                <CardContent sx={{ padding: 4 }}>
                  {/* Mobile Branding */}
                  <Box sx={{
                    display: { xs: 'flex', md: 'none' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3
                  }}>
                    <Work sx={{ fontSize: 32, mr: 1, color: 'primary.main' }} />
                    <Typography variant="h4" fontWeight="bold" color="primary.main">
                      SmartJob
                    </Typography>
                  </Box>

                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                    Sign in to your account
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Enter your credentials to access your recruiter dashboard
                  </Typography>

                  {/* Demo user info */}
                  <Box sx={{
                    bgcolor: 'info.light',
                    color: 'info.contrastText',
                    p: 2,
                    borderRadius: 1,
                    mb: 2,
                    fontSize: '0.875rem'
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      Demo Account Available:
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                      Email: manisha.sah@email.com<br />
                      Password: Demo@123
                    </Typography>
                  </Box>

                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}

                  {/* Debug Panel */}
                  <Box sx={{ mb: 2 }}>
                    <Button
                      onClick={() => setShowDebug(!showDebug)}
                      variant="outlined"
                      size="small"
                      sx={{ mb: 1 }}
                    >
                      {showDebug ? 'Hide' : 'Show'} Debug Info
                    </Button>
                    {showDebug && (
                      <Box sx={{
                        bgcolor: 'grey.100',
                        p: 2,
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'grey.300'
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          Registered Users:
                        </Typography>
                        <pre style={{ fontSize: '10px', overflow: 'auto', maxHeight: '100px' }}>
                          {JSON.stringify(getRegisteredUsers(), null, 2)}
                        </pre>
                        <Button
                          onClick={debugLocalStorage}
                          variant="text"
                          size="small"
                          sx={{ mt: 1 }}
                        >
                          Log Debug Info to Console
                        </Button>
                      </Box>
                    )}
                  </Box>

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
                      placeholder="Enter your registered email address"
                      helperText="Use the email address you registered with"
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      margin="normal"
                      required
                      helperText="Enter your account password"
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

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading}
                      sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Don't have an account?{' '}
                        <Link
                          to="/register"
                          style={{
                            color: '#6366f1',
                            textDecoration: 'none',
                            fontWeight: 600
                          }}
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
