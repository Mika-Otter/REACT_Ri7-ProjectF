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
      state.value = [
        ...state.value,
        { name, url, id, checked: false, ...rest },
      ];
    },
    toggleFontState: (state, action) => {
      const { fontName } = action.payload;

      const font = state.value.find((font) => font.name === fontName);
      if (font) {
        font.checked = !font.checked;
      }
    },
    toggleFavorite: (state, action) => {
      const { fontId, favorite } = action.payload;
      state.value = state.value.map((font) =>
        font.id === fontId ? { ...font, favorite: favorite } : font
      );
    },
    deleteFont: (state, action) => {
      const fontId = action.payload;
      state.value = state.value.filter((font) => font.id !== fontId);
    },
  },
});

export const { setFonts, toggleFontState, toggleFavorite, deleteFont } =
  fontsSlice.actions;
export default fontsSlice.reducer;
