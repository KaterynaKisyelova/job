import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllJobsThunk, showStatsThunk } from "./allJobsThunk";
import {
  CreatedJob,
  MonthlyApplication,
  SearchRowNames,
  Stats,
} from "../../utils/types";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

type InitialState = {
  isLoading: boolean;
  jobs: CreatedJob[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: Stats;
  monthlyApplications: MonthlyApplication[];
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: string[];
};

const initialState: InitialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {
    pending: 0,
    interview: 0,
    declined: 0,
  },
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk("allJobs/getJobs", getAllJobsThunk);

export const showStats = createAsyncThunk("allJobs/showStats", showStatsThunk);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (
      state,
      {
        payload: { name, value },
      }: PayloadAction<{ name: SearchRowNames; value: string }>
    ) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    clearAllJobsState: (_) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
        state.numOfPages = payload.numOfPages;
        state.totalJobs = payload.totalJobs;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;

        if (typeof payload === "string") {
          toast.error(payload);
        }
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;

        if (typeof payload === "string") {
          toast.error(payload);
        }
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions;

export default allJobsSlice.reducer;
