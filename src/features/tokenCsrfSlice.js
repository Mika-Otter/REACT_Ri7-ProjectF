import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  csrfToken: "",
};

const tokenCsrfSlice = createSlice({
  name: "tokenCsrf",
  initialState,
  reducers: {
    setCsrfToken: (state, action) => {
      state.csrfToken = action.payload;
    },
  },
});

export const { setCsrfToken } = tokenCsrfSlice.actions;
export default tokenCsrfSlice.reducer;
