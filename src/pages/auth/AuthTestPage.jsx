import React from 'react';
import { Box, Button, Typography, Paper, Divider } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext.jsx';

const AuthTestPage = () => {
  const {
    user,
    login,
    register,
    logout,
    getRegisteredUsers,
    debugLocalStorage,
    clearAllData,
    testLocalStorage
  } = useAuth();

  const testRegistration = async () => {
    console.log('Testing registration...');
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'TestPass@123',
      companyName: 'Test Company'
    };

    const result = await register(testUser);
    console.log('Registration result:', result);
  };

  const testLogin = async () => {
    console.log('Testing login...');
    const result = await login('test@example.com', 'TestPass@123');
    console.log('Login result:', result);
  };

  const testDemoLogin = async () => {
    console.log('Testing demo login...');
    const result = await login('manisha.sah@email.com', 'Demo@123');
    console.log('Demo login result:', result);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Authentication System Test
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Current User Status
        </Typography>
        <Typography variant="body1">
          {user ? `Logged in as: ${user.name} (${user.email})` : 'Not logged in'}
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Registered Users
        </Typography>
        <pre style={{ fontSize: '12px', overflow: 'auto', maxHeight: '200px' }}>
          {JSON.stringify(getRegisteredUsers(), null, 2)}
        </pre>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Test Actions
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Button variant="contained" onClick={testLocalStorage}>
            Test LocalStorage
          </Button>
          <Button variant="contained" onClick={testRegistration}>
            Test Registration
          </Button>
          <Button variant="contained" onClick={testLogin}>
            Test Login
          </Button>
          <Button variant="contained" onClick={testDemoLogin}>
            Test Demo Login
          </Button>
          <Button variant="outlined" onClick={logout}>
            Logout
          </Button>
          <Button variant="outlined" onClick={debugLocalStorage}>
            Debug LocalStorage
          </Button>
          <Button variant="outlined" color="error" onClick={clearAllData}>
            Clear All Data
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthTestPage;
