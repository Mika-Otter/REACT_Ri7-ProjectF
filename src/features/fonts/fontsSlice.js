import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

const fontsSlice = createSlice({
    name: "fonts",
    initialState,
    reducers: {
        setFonts: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setFonts } = fontsSlice.actions;
export default fontsSlice.reducer;
