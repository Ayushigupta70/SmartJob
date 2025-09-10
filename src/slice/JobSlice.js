import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../utils/axios';


export const createJob = createAsyncThunk("jobs/createJob",async (jobData, thunkApi) => {
    try {
      const res = await axios.post(`jobs/`, jobData);
      return res.data.data; 
    } catch (err) {
      return thunkApi.rejectWithValue(
        err.response?.data?.message || "Failed to create job"
      );
    }
  }
);
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async (_, thunkApi) => {
  try {
    const res = await axios.get(`jobs/`);
    return res.data.data;  
  } catch (err) {
    return thunkApi.rejectWithValue(
      err.response?.data?.message || "Failed to fetch jobs"
    );
  }
});
export const fetchJobStats = createAsyncThunk("jobs/fetchJobStats", async (_, thunkApi) => {
  try {
    const res = await axios.get(`jobs/stats`);
    return res.data.data;
  } catch (err) {
    return thunkApi.rejectWithValue(
      err.response?.data?.message || "Failed to fetch job stats"
    );
  }
});

export const updateJob = createAsyncThunk("jobs/updateJob",async (jobData, thunkApi) => {
    try {
      const res = await axios.put(`jobs/${jobData._id}`, jobData);
      return res.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(
        err.response?.data?.message || "Failed to update job"
      );
    }
  }
)
export const deleteJob = createAsyncThunk("jobs/deleteJob",async (jobId, thunkApi) => {
    try {
      await axios.delete(`jobs/${jobId}`);
      return jobId;
    } catch (err) {
      return thunkApi.rejectWithValue(
        err.response?.data?.message || "Failed to delete job"
      );
    }
  }
);
const initialState = {
  jobs: [],
  jobs2:[],
  loading: false,
  error: null,
  success: false,
  stats: { totalJobs: 0, activeJobs: 0 },
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createJob.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createJob.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.jobs.push(action.payload);
    });
    builder.addCase(createJob.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchJobs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
   builder.addCase(fetchJobs.fulfilled, (state, action) => {
  state.loading = false;
  state.jobs2 = action.payload; 
});
    builder.addCase(fetchJobs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateJob.fulfilled, (state, action) => {
      state.success = true;
      state.jobs2 = state.jobs.map((job) =>
        job._id === action.payload._id ? action.payload : job
      );
    });
    builder.addCase(deleteJob.fulfilled, (state, action) => {
      state.jobs = state.jobs.filter((job) => job._id !== action.payload);
    });
    builder.addCase(fetchJobStats.pending, (state) => {
  state.loading = true;
  state.error = null;
});
builder.addCase(fetchJobStats.fulfilled, (state, action) => {
  state.loading = false;
  state.stats = action.payload;  // ✅ save stats
});
builder.addCase(fetchJobStats.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});

  },
});

export const { clearSuccess } = jobSlice.actions;
export default jobSlice.reducer;
