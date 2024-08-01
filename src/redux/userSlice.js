import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "userInfo/fetchUser",
  async (username, thunkAPI) => {
    const response = await axios.get(
      `/api/users/user-details?username=${username}`
    );
    return response.data;
  }
);

const userSlice = createSlice({
  name: "userInfo",
  initialState: {
    userInfo: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;

// store/userSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk for fetching user data
// export const fetchUser = createAsyncThunk(
//   'user/fetchUser',
//   async (userId, thunkAPI) => {
//     const response = await axios.get(`/api/user/${userId}`);
//     return response.data;
//   }
// );

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     user: null,
//     status: 'idle',
//     error: null
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   }
// });

// export default userSlice.reducer;
