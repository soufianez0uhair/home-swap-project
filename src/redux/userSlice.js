import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers(builder) {
    
  }
})

export default userSlice.reducer;
export const selectUser = (state) => state.user.user;