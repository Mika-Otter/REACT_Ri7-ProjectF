import { configureStore } from "@reduxjs/toolkit";
import fontsSlice from "../src/features/fonts/fontsSlice";

export const store = configureStore({
    reducer: {
        fonts: fontsSlice,
    },
});
