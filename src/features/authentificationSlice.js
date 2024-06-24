import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  isAuthenticated: false,
  userFonts: [],
  username: "",
};

const authentificationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      state.isAuthenticated = true;
    },
    clearUserId: (state) => {
      state.userId = null;
      state.isAuthenticated = false;
    },
    setUserFonts: (state, action) => {
      state.userFonts = [...state.userFonts, action.payload];
    },
    setUserName: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUserId, clearUserId, setUserFonts, setUserName } =
  authentificationSlice.actions;
export default authentificationSlice.reducer;
