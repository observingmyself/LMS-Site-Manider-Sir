import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { googleAuth } from "../../login with google/api";
import { baseURL } from "../../constant/constant";
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  token: "",
};

export const userRegister = createAsyncThunk("/register", async (formData) => {
  try {
    const response = await axios.post(`${baseURL}/api/v1/user/register`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("ERROR in userRegister", error);
  }
});

export const userLogin = createAsyncThunk("/login", async (formData) => {
  try {
    const response = await axios.post(`${baseURL}/api/v1/user/login`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    // console.log(error.response.data)
    // console.error("ERROR in userLogin", error);
  }
});

export const googleLogin = createAsyncThunk(
  "/google-login",
  async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        // console.log(result);
        return result.data;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("ERROR in googleLogin", error);
    }
  }
);

export const checkAuth = createAsyncThunk("/checkauth", async () => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/user/profile`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("checkAuth error");
  }
});

export const logoutAuth = createAsyncThunk("/logout", async () => {
  try {
    const response = await axios.post(`${baseURL}/api/v1/user/logout`, {}, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("logout error", error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
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
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;

        state.user = action.payload?.data?.user || null;

        state.token = action.payload?.data?.accessToken;

        state.isAuthenticated = !!action.payload?.success;
      })

      .addCase(googleLogin.rejected, (state) => {
        state.isLoading = false;

        state.user = null;

        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.success ? action.payload.data : null;
        state.isAuthenticated = action.payload?.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAuth.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { addUser } = authSlice.actions;
export default authSlice.reducer;
