import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

const fontsSlice = createSlice({
    name: "fonts",
    initialState,
    reducers: {
        setFonts: (state, action) => {
            const { name, url, ...rest } = action.payload; // Récupérer name, url et les autres propriétés de la typo
            state.value = [...state.value, { name, url, ...rest }]; // Ajouter la typo avec name et url au state
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
