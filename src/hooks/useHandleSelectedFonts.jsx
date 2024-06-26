import {
  unselectChoosedFont,
  setChoosedFonts,
} from "../features/choosedFontSlide";
import { toggleFontState } from "../features/fontsSlice";

export const useHandleSelectedFonts = (fonts, choosedFonts, dispatch) => {
  return function (name) {
    dispatch(toggleFontState({ fontName: name })); //reverse state

    const selectedFont = fonts.find((font) => font.name === name); //Find font by name
    if (selectedFont) {
      if (!selectedFont.checked) {
        //Add font if not checked and font name doesn't already exist
        if (!choosedFonts.find((font) => font.name === name)) {
          dispatch(setChoosedFonts([...choosedFonts, selectedFont]));
        }
      } else {
        dispatch(unselectChoosedFont(selectedFont)); //if font already exist unselect it
      }
    }
  };
};
