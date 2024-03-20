import { configureStore } from "@reduxjs/toolkit";
import fontsSlice from "../src/features/fontsSlice";
import choosedFontSlice from "../src/features/choosedFontSlide";
import authSlice from "../src/features/authSlice";

export const store = configureStore({
    reducer: {
        fonts: fontsSlice,
        choosedFonts: choosedFontSlice,
        auth: authSlice,
    },
});
