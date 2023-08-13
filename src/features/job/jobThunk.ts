import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearValues } from "./jobSlice";
import { Job } from "../../utils/types";
import { AxiosError } from "axios";

export const createJobThunk = async (job: Job, thunkAPI: any) => {
  try {
    const resp = await customFetch.post("/jobs", job);
    thunkAPI.dispatch(clearValues());
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(
      error as AxiosError<{ msg: string }>,
      thunkAPI
    );
  }
};

export const deleteJobThunk = async (jobId: string, thunkAPI: any) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAllJobs());

    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());

    return checkForUnauthorizedResponse(
      error as AxiosError<{ msg: string }>,
      thunkAPI
    );
  }
};

export const editJobThunk = async (
  { jobId, job }: { jobId: string; job: Job },
  thunkAPI: any
) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValues());

    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(
      error as AxiosError<{ msg: string }>,
      thunkAPI
    );
  }
};
