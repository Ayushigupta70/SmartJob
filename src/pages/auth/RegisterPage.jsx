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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Work,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext.jsx';
import './AuthPages.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (!password) return '';

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);
    const isLongEnough = password.length >= 8;

    if (isLongEnough && hasUpper && hasLower && hasNumber && hasSpecial) {
      return 'Strong';
    } else if (password.length >= 6 && ((hasUpper && hasLower) || (hasNumber && hasSpecial))) {
      return 'Medium';
    } else {
      return 'Weak';
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Check password strength in real-time
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }

    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Enhanced validation
    if (!formData.name?.trim()) {
      setError('Full name is required');
      setLoading(false);
      return;
    }

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

    if (!formData.confirmPassword) {
      setError('Please confirm your password');
      setLoading(false);
      return;
    }

    if (!formData.companyName?.trim()) {
      setError('Company name is required');
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

    // Password strength validation
    if (passwordStrength !== 'Strong') {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
      setError('Please accept the terms and conditions to continue');
      setLoading(false);
      return;
    }

    const result = await register(formData);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Box className="auth-background">
      <Container maxWidth="lg">
        <Grid container spacing={0} sx={{ minHeight: '100vh', alignItems: 'center', py: 4 }}>
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
                Join thousands of recruiters
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                Create your account and start building your dream team. Our platform provides
                all the tools you need to efficiently manage your recruitment process.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    ✓
                  </Box>
                  <Typography variant="body1">Free account setup with company verification</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    ✓
                  </Box>
                  <Typography variant="body1">Access to candidate database and job posting tools</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    ✓
                  </Box>
                  <Typography variant="body1">Built-in communication and interview scheduling</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Registration Form */}
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
                    Create your account
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Join as a recruiter and start building your team
                  </Typography>

                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      margin="normal"
                      required
                      placeholder="Manisha Sah"
                    />

                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      margin="normal"
                      required
                      placeholder="manisha.sah@email.com"
                    />

                    <TextField
                      fullWidth
                      label="Company Name"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      margin="normal"
                      required
                      placeholder="Tech Solutions Inc."
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
                      helperText="Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character (@$!%*?&)"
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

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: passwordStrength === 'Strong' ? 'success.main' :
                              passwordStrength === 'Medium' ? 'warning.main' : 'error.main',
                            fontWeight: 'bold'
                          }}
                        >
                          Password Strength: {passwordStrength}
                        </Typography>
                        <Box sx={{
                          height: 4,
                          bgcolor: 'grey.300',
                          borderRadius: 2,
                          mt: 0.5,
                          overflow: 'hidden'
                        }}>
                          <Box sx={{
                            height: '100%',
                            width: passwordStrength === 'Strong' ? '100%' :
                              passwordStrength === 'Medium' ? '66%' : '33%',
                            bgcolor: passwordStrength === 'Strong' ? 'success.main' :
                              passwordStrength === 'Medium' ? 'warning.main' : 'error.main',
                            transition: 'all 0.3s ease'
                          }} />
                        </Box>
                      </Box>
                    )}

                    <TextField
                      fullWidth
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      margin="normal"
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body2" color="text.secondary">
                          I agree to the Terms of Service and Privacy Policy
                        </Typography>
                      }
                      sx={{ mt: 2 }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading}
                      sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Already have an account?{' '}
                        <Link
                          to="/login"
                          style={{
                            color: '#6366f1',
                            textDecoration: 'none',
                            fontWeight: 600
                          }}
                        >
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
