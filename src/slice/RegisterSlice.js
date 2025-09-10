import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";
import {jwtDecode} from "jwt-decode";

const safeJSONParse = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value && value !== "undefined" ? JSON.parse(value) : null;
  } catch (err) {
    console.error(`Invalid JSON in localStorage for key: ${key}`, err);
    return null;
  }
};
// Global logout timer
let logoutTimer;
// Set auto logout based on token expiry
const setAutoLogout = (dispatch, token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp) {
      const expiryTime = decoded.exp * 1000; // convert to ms
      const remainingTime = expiryTime - Date.now();
 
      if (logoutTimer) clearTimeout(logoutTimer);

      if (remainingTime > 0) {
        logoutTimer = setTimeout(() => {
          dispatch(registerSlice.actions.logout());
        }, remainingTime);
      } else {
        // Token already expired
        dispatch(registerSlice.actions.logout());
      }
    }
  } catch (err) {
    console.error("Invalid token", err);
  }
};
// --- Thunks ---
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`user/register`, formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`user/login`, formData);
      // Start auto logout timer
      setAutoLogout(thunkAPI.dispatch, response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Invalid email or password"
      );
    }
  }
);

export const updateRecruiterProfile = createAsyncThunk(
  "users/updateRecruiterProfile",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.put(`/user/recruiter/profile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// Restore session on page reload
export const restoreSession = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 > Date.now()) {
      // Token still valid → start auto logout timer
      setAutoLogout(dispatch, token);
    } else {
      // Token expired → logout immediately
      dispatch(registerSlice.actions.logout());
    }
  }
};
// --- Initial State ---
const initialState = {
  loading: false,
  error: null,
  success: false,
  user: safeJSONParse("user"),
  token: localStorage.getItem("token") || null,
  userRole: localStorage.getItem("role") || null,
};
// --- Slice ---
const registerSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userRole = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");

      if (logoutTimer) clearTimeout(logoutTimer);
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload.token;
        state.userRole = action.payload.role;
        state.user = action.payload.user;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.role);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update recruiter profile
      .addCase(updateRecruiterProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRecruiterProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateRecruiterProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess, logout } = registerSlice.actions;
export default registerSlice.reducer;
