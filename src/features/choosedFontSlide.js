import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

const choosedFontSlice = createSlice({
    name: "choosedfonts",
    initialState,
    reducers: {
        setChoosedFonts: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setChoosedFonts, toggleFontState } = choosedFontSlice.actions;
export default choosedFontSlice.reducer;
