import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

const fontsSlice = createSlice({
    name: "fonts",
    initialState,
    reducers: {
        setFonts: (state, action) => {
            const { name, url, id, ...rest } = action.payload;
            state.value = [...state.value, { name, url, id, ...rest }];
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