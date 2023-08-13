import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";
import { EditedJob, Job, RowNames } from "../../utils/types";
import { AppDispatch, RootState } from "../../store";

type InitialState = {
  isLoading: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions: string[];
  jobType: string;
  statusOptions: string[];
  status: string;
  isEditing: boolean;
  editJobId: string;
};

const initialState: InitialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk<
  string,
  Job,
  { rejectValue: string; dispatch: AppDispatch; state: RootState }
>("job/createJob", createJobThunk);

export const deleteJob = createAsyncThunk<
  string,
  string,
  { rejectValue: string; dispatch: AppDispatch; state: RootState }
>("job/deleteJob", deleteJobThunk);

export const editJob = createAsyncThunk<
  Job,
  { jobId: string; job: Job },
  { rejectValue: string; dispatch: AppDispatch; state: RootState }
>("job/editJob", editJobThunk);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (
      state,
      { payload }: PayloadAction<{ name: RowNames; value: string }>
    ) => {
      const { name, value } = payload;
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, { payload }: PayloadAction<EditedJob>) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Created");
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        if (typeof payload === "string") {
          toast.error(payload);
        }
      })
      .addCase(deleteJob.fulfilled, (_, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteJob.rejected, (_, { payload }) => {
        if (typeof payload === "string") {
          toast.error(payload);
        }
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Modified...");
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        if (typeof payload === "string") {
          toast.error(payload);
        }
      });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
