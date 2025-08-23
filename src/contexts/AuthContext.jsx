import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate strong password
const isStrongPassword = (password) => {
  // At least 8 characters, one uppercase, one lowercase, one number, one special character
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};

// Helper function to hash password (simple simulation - in real app use bcrypt)
const hashPassword = (password) => {
  // Simple hash simulation - in real app, use proper hashing
  return btoa(password + 'smartjob_salt');
};

// Helper function to verify password
const verifyPassword = (password, hashedPassword) => {
  return hashPassword(password) === hashedPassword;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('=== INITIALIZING AUTH CONTEXT ===');

    // Initialize with demo user if no users exist
    const existingUsers = localStorage.getItem('smartjob_registered_users');
    console.log('Existing users in localStorage:', existingUsers);

    const registeredUsers = JSON.parse(existingUsers || '[]');
    console.log('Parsed existing users:', registeredUsers);

    if (registeredUsers.length === 0) {
      console.log('No users found, creating demo user...');
      // Create a demo user for testing
      const demoUser = {
        id: 1,
        name: 'Ayushi Gupta',
        email: 'manisha.sah@email.com',
        hashedPassword: hashPassword('Demo@123'),
        role: 'Recruiter',
        company: 'Tech Solutions Inc.',
        avatar: null,
        joinedDate: new Date().toISOString(),
      };

      const newUsersList = [demoUser];
      localStorage.setItem('smartjob_registered_users', JSON.stringify(newUsersList));
      console.log('Demo user created and saved:', newUsersList);

      // Verify the save
      const verification = localStorage.getItem('smartjob_registered_users');
      console.log('Verification - saved data:', verification);
    } else {
      console.log('Found existing users:', registeredUsers.length);
    }

    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('smartjob_user');
    console.log('Saved user session:', savedUser);

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      console.log('User session restored');
    } else {
      console.log('No active user session');
    }

    setLoading(false);
    console.log('=== AUTH CONTEXT INITIALIZED ===');
  }, []);

  const login = async (email, password) => {
    try {
      console.log('=== LOGIN ATTEMPT ===');
      console.log('Email:', email);
      console.log('Password length:', password?.length);

      // Validate input
      if (!email || !password) {
        console.log('Missing email or password');
        return { success: false, error: 'Email and password are required' };
      }

      if (!isValidEmail(email)) {
        console.log('Invalid email format');
        return { success: false, error: 'Please enter a valid email address' };
      }

      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('smartjob_registered_users') || '[]');
      console.log('Registered users from localStorage:', registeredUsers);
      console.log('Number of registered users:', registeredUsers.length);

      // Find user by email
      const foundUser = registeredUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
      console.log('Found user:', foundUser ? 'Yes' : 'No');

      if (!foundUser) {
        console.log('User not found in registered users');
        return { success: false, error: 'No account found with this email address. Please register first.' };
      }

      console.log('Verifying password...');
      // Verify password
      if (!verifyPassword(password, foundUser.hashedPassword)) {
        console.log('Password verification failed');
        return { success: false, error: 'Invalid password. Please check your credentials and try again.' };
      }

      console.log('Login successful!');
      // Create user session data (without password)
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        company: foundUser.company,
        avatar: foundUser.avatar,
        joinedDate: foundUser.joinedDate,
      };

      setUser(userData);
      localStorage.setItem('smartjob_user', JSON.stringify(userData));
      console.log('=== LOGIN COMPLETE ===');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }; const register = async (userData) => {
    try {
      console.log('=== REGISTRATION ATTEMPT ===');
      console.log('User data:', userData);

      // Validate required fields
      if (!userData.name || !userData.email || !userData.password || !userData.companyName) {
        console.log('Missing required fields');
        return { success: false, error: 'All fields are required' };
      }

      // Validate email format
      if (!isValidEmail(userData.email)) {
        console.log('Invalid email format');
        return { success: false, error: 'Please enter a valid email address' };
      }

      // Validate strong password
      if (!isStrongPassword(userData.password)) {
        console.log('Password not strong enough');
        return {
          success: false,
          error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
        };
      }

      // Get existing registered users
      const registeredUsers = JSON.parse(localStorage.getItem('smartjob_registered_users') || '[]');
      console.log('Existing registered users:', registeredUsers);

      // Check if email already exists
      const existingUser = registeredUsers.find(user => user.email.toLowerCase() === userData.email.toLowerCase());
      if (existingUser) {
        console.log('Email already exists');
        return { success: false, error: 'An account with this email already exists. Please login instead.' };
      }

      // Create new user with hashed password
      const newUser = {
        id: Date.now(),
        name: userData.name.trim(),
        email: userData.email.toLowerCase().trim(),
        hashedPassword: hashPassword(userData.password),
        role: 'Recruiter',
        company: userData.companyName.trim(),
        avatar: null,
        joinedDate: new Date().toISOString(),
      };

      console.log('Creating new user:', { ...newUser, hashedPassword: '[HIDDEN]' });

      // Add to registered users
      registeredUsers.push(newUser);
      localStorage.setItem('smartjob_registered_users', JSON.stringify(registeredUsers));

      console.log('Saved to localStorage. Total users now:', registeredUsers.length);
      console.log('Verifying save...');
      const savedUsers = JSON.parse(localStorage.getItem('smartjob_registered_users') || '[]');
      console.log('Verification - saved users count:', savedUsers.length);

      // Create session data (without password)
      const sessionData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        company: newUser.company,
        avatar: newUser.avatar,
        joinedDate: newUser.joinedDate,
      };

      setUser(sessionData);
      localStorage.setItem('smartjob_user', JSON.stringify(sessionData));
      console.log('=== REGISTRATION COMPLETE ===');
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartjob_user');
  };

  // Helper function to get all registered users (for admin purposes)
  const getRegisteredUsers = () => {
    return JSON.parse(localStorage.getItem('smartjob_registered_users') || '[]');
  };

  // Debug function to check localStorage
  const debugLocalStorage = () => {
    const registeredUsers = localStorage.getItem('smartjob_registered_users');
    const currentUser = localStorage.getItem('smartjob_user');
    console.log('=== DEBUG LOCALSTORAGE ===');
    console.log('Registered Users:', registeredUsers);
    console.log('Parsed Registered Users:', JSON.parse(registeredUsers || '[]'));
    console.log('Current User:', currentUser);
    console.log('=========================');
    return {
      registeredUsers: JSON.parse(registeredUsers || '[]'),
      currentUser: JSON.parse(currentUser || 'null')
    };
  };

  // Function to clear all localStorage (for testing)
  const clearAllData = () => {
    localStorage.removeItem('smartjob_registered_users');
    localStorage.removeItem('smartjob_user');
    setUser(null);
    console.log('All localStorage data cleared');
  };

  // Function to test localStorage functionality
  const testLocalStorage = () => {
    try {
      // Test basic localStorage functionality
      const testKey = 'smartjob_test';
      const testValue = { test: 'data', timestamp: Date.now() };

      console.log('Testing localStorage...');
      localStorage.setItem(testKey, JSON.stringify(testValue));

      const retrieved = localStorage.getItem(testKey);
      const parsed = JSON.parse(retrieved);

      console.log('Test data saved:', testValue);
      console.log('Test data retrieved:', parsed);

      localStorage.removeItem(testKey);

      if (JSON.stringify(testValue) === JSON.stringify(parsed)) {
        console.log('✅ localStorage is working correctly');
        return true;
      } else {
        console.log('❌ localStorage data mismatch');
        return false;
      }
    } catch (error) {
      console.error('❌ localStorage test failed:', error);
      return false;
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    getRegisteredUsers,
    debugLocalStorage,
    clearAllData,
    testLocalStorage,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
