import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
  clearStoreThunk,
} from "./userThunk";
import { CreatedUser, NewUser, User } from "../../utils/types";
import { AppDispatch, RootState } from "../../store";

type InitialState = {
  isLoading: boolean;
  isSidebarOpen: boolean;
  user: CreatedUser | null;
};

const initialState: InitialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk<
  { user: CreatedUser },
  User,
  { rejectValue: string; dispatch: AppDispatch; state: RootState }
>("user/registerUser", async (user, thunkAPI) => {
  return registerUserThunk("/auth/register", user, thunkAPI);
});

export const loginUser = createAsyncThunk<
  { user: CreatedUser },
  Omit<User, "name">,
  { rejectValue: string; dispatch: AppDispatch; state: RootState }
>("user/loginUser", async (user, thunkAPI) => {
  return loginUserThunk("/auth/login", user, thunkAPI);
});

export const updateUser = createAsyncThunk<
  { user: CreatedUser },
  NewUser,
  { rejectValue: string; dispatch: AppDispatch; state: RootState }
>("user/updateUser", async (user, thunkAPI) => {
  return updateUserThunk("/auth/updateUser", user, thunkAPI);
});

export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },

    logoutUser: (state, { payload }: PayloadAction<string | undefined>) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();

      if (payload) {
        toast.success(payload);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello There ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;

        if (typeof payload === "string") {
          toast.error(payload);
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome Back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;

        if (typeof payload === "string") {
          toast.error(payload);
        }
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);

        toast.success(`User Updated!`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;

        if (typeof payload === "string") {
          toast.error(payload);
        }
      })
      .addCase(clearStore.rejected, () => {
        toast.error("There was an error..");
      });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
