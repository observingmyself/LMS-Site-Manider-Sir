import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const userRegister = createAsyncThunk("/register", async (formData) => {
  const response = await axios.post(
    "http://localhost:3000/api/v1/user/register",
    formData
  );
  //   console.log(response)
  return response.data;
});
export const userLogin = createAsyncThunk("/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:3000/api/v1/user/login",
    formData
  );
  console.log(response);
  return response.data;
});

export const checkAuth = createAsyncThunk("/checkauth", async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/profile",
      {withCredentials : true}
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(userRegister.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.data.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(userLogin.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.data.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { addUser } = authSlice.actions;
export default authSlice.reducer;
