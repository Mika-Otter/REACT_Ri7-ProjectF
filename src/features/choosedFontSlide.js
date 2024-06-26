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
    unselectChoosedFont: (state, action) => {
      const fontToDelete = action.payload;
      state.value = state.value.filter(
        (font) => font.name !== fontToDelete.name
      );
    },
  },
});

export const { setChoosedFonts, unselectChoosedFont } =
  choosedFontSlice.actions;
export default choosedFontSlice.reducer;
