import { configureStore } from "@reduxjs/toolkit";
import fontsSlice from "../src/features/fonts/fontsSlice";
import choosedFontSlice from "../src/features/fonts/choosedFontSlide";
import authSlice from "../src/features/fonts/authSlice";

export const store = configureStore({
    reducer: {
        fonts: fontsSlice,
        choosedFonts: choosedFontSlice,
        auth: authSlice,
    },
});
