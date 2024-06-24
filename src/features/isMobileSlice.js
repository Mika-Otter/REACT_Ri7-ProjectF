import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  windowWidth: window.innerWidth,
  isMobile: window.innerWidth < 900,
};

const isMobileSlice = createSlice({
  name: "isMobile",
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
  },
});

export const { setIsMobile, setWindowWidth } = isMobileSlice.actions;
export default isMobileSlice.reducer;
