import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: JSON.parse(localStorage.getItem('token')) || null,
  // error in case of failed authentification after succeeding at passing all the form inputs validation conditions(or you can have no validation in the front only the back, anyway must research the topic) 
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    auth(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }
})

export default userSlice.reducer;
export const selectUser = (state) => state.user.user;
export const {auth, logout} = userSlice.actions;