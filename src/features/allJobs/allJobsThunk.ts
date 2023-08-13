import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { AxiosError } from "axios";

export const getAllJobsThunk = async (_ = null, thunkAPI: any) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;

  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

  if (search) {
    url = url + `&search=${search}`;
  }

  try {
    const resp = await customFetch.get(url);

    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(
      error as AxiosError<{ msg: string }>,
      thunkAPI
    );
  }
};

export const showStatsThunk = async (_ = null, thunkAPI: any) => {
  try {
    const resp = await customFetch.get("/jobs/stats");

    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(
      error as AxiosError<{ msg: string }>,
      thunkAPI
    );
  }
};
