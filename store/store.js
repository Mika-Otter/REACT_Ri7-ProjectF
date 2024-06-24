import { configureStore } from "@reduxjs/toolkit";
import fontsSlice from "../src/features/fontsSlice";
import choosedFontSlice from "../src/features/choosedFontSlide";
import authentificationSlice from "../src/features/authentificationSlice";
import tokenCsrfSlice from "../src/features/tokenCsrfSlice";

export const store = configureStore({
  reducer: {
    fonts: fontsSlice,
    choosedFonts: choosedFontSlice,
    auth: authentificationSlice,
    csrf: tokenCsrfSlice,
  },
});
