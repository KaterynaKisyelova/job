import jobSlice from "./features/job/jobSlice";
import userSlice from "./features/user/userSlice";
import allJobsSlice from "./features/allJobs/allJobsSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
