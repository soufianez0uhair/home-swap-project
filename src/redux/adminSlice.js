import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
}

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    auth(state, action) {
      state.admin = action.payload.admin;
    },
    logout(state) {
      state.admin = null;
    }
  }
})

export default adminSlice.reducer;
export const selectAdmin = (state) => state.admin.admin;
export const {auth, logout} = adminSlice.actions;