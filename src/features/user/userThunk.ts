import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { CreatedUser, NewUser, User } from "../../utils/types";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";
import { logoutUser } from "./userSlice";
import { AxiosError, AxiosResponse } from "axios";

export const registerUserThunk = async (
  url: string,
  user: User,
  thunkAPI: any
) => {
  try {
    const resp: AxiosResponse<CreatedUser> = await customFetch.post(url, user);

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      (error as AxiosError<{ msg: string }>)?.response?.data?.msg
    );
  }
};

export const loginUserThunk = async (
  url: string,
  user: Omit<User, "name">,
  thunkAPI: any
) => {
  try {
    const resp = await customFetch.post(url, user);

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      (error as AxiosError<{ msg: string }>)?.response?.data?.msg
    );
  }
};

export const updateUserThunk = async (
  url: string,
  user: NewUser,
  thunkAPI: any
) => {
  try {
    const resp = await customFetch.patch(url, user);

    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(
      error as AxiosError<{ msg: string }>,
      thunkAPI
    );
  }
};

export const clearStoreThunk = async (message?: string, thunkAPI?: any) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearAllJobsState());
    thunkAPI.dispatch(clearValues());

    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
