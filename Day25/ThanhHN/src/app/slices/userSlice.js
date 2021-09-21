import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: 'null',
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = 'null';
    },
  },
});

export const { saveToken, logout } = auth.actions;

export default auth.reducer;
