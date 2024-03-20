import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
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
    },
});

export const { setUserId, clearUserId } = authSlice.actions;
export default authSlice.reducer;
