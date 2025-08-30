import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

// ✅ Helper function to safely parse JSON
const safeJSONParse = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value && value !== "undefined" ? JSON.parse(value) : null;
  } catch (err) {
    console.error(`Invalid JSON in localStorage for key: ${key}`, err);
    return null;
  }
};

// ✅ Register API
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

// ✅ Login API
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`user/login`, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Invalid email or password"
      );
    }
  }
);

// ✅ Update Recruiter Profile API
export const updateRecruiterProfile = createAsyncThunk(
  "users/updateRecruiterProfile",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.token;
      const res = await axios.put("/user/recruiter/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

// ✅ Initial state with safe localStorage parsing
const initialState = {
  loading: false,
  error: null,
  success: false,
  user: safeJSONParse("user"),
  token: localStorage.getItem("token") || null,
  userRole: localStorage.getItem("role") || null,
};

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
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Register cases
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

      // ✅ Login cases
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

      // ✅ Update recruiter profile cases
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
