import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

const fontsSlice = createSlice({
    name: "fonts",
    initialState,
    reducers: {
        setFonts: (state, action) => {
            state.value = [...state.value, action.payload];
        },
        toggleFontState: (state, action) => {
            const { fontName } = action.payload;
            const font = state.value.find((font) => font.name === fontName);
            if (font) {
                font.state = !font.state;
            }
        },
    },
});

export const { setFonts, toggleFontState } = fontsSlice.actions;
export default fontsSlice.reducer;
