import { useDispatch, useSelector } from "react-redux";
import axios from "../app/api/axios";
import { useEffect, useState } from "react";
import { deleteFont, toggleFontState } from "../features/fontsSlice";
import { setChoosedFonts } from "../features/choosedFontSlide";
import { useNavigate } from "react-router-dom";

export const useHandleFonts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fonts = useSelector((state) => state.fonts.value);
  const choosedFonts = useSelector((state) => state.choosedFonts.value);
  const csrfToken = useSelector((state) => state.csrf.csrfToken);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const deleteFonts = async (fontId) => {
    try {
      dispatch(deleteFont(fontId));
      const res = await axios.post(
        "/fonts/delete",
        { fontId },
        {
          headers: { "X-CSRF-Token": csrfToken },
          withCredentials: true,
        }
      );
      return res.status === 200;
    } catch (err) {
      console.error("FAILED : Try to delete typo => ", err);
    }
  };

  const selectFontAndNavigate = (fontId, route) => {
    const selectedFont = fonts.find((font) => font.id === fontId);
    if (!selectedFont.checked) {
      dispatch(toggleFontState({ fontName: selectedFont.name }));
      dispatch(setChoosedFonts([...choosedFonts, selectedFont]));
    }
    navigate(route);
  };

  useEffect(() => {
    if (fonts.length > 0) {
      setFontsLoaded(true);
    }
  }, [fonts]);

  return { fonts, fontsLoaded, deleteFonts, selectFontAndNavigate };
};
