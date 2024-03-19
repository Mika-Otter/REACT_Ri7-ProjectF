import { configureStore } from "@reduxjs/toolkit";
import fontsSlice from "../src/features/fonts/fontsSlice";
import choosedFontSlice from "../src/features/fonts/choosedFontSlide";

export const store = configureStore({
    reducer: {
        fonts: fontsSlice,
        choosedFonts: choosedFontSlice,
    },
});
