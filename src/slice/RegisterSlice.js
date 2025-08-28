import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

// ✅ Register API
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`register`, formData);
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
      const response = await axios.post(`login`, formData);
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Invalid email or password"
      );
    }
  }
);

const registerSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    error: null,
    success: false,
    user: null,
    token: null,
    userRole: null, 
  },
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
    },
  },
  extraReducers: (builder) => {
    builder
      
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
})
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess, logout } = registerSlice.actions;
export default registerSlice.reducer;
