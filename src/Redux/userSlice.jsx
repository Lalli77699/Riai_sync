// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {}, // Your default user object
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = {};
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
