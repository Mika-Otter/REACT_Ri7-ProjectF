import React, { useState, useRef } from "react";
import s from "./Folder.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { setFonts, toggleFontState } from "../../features/fontsSlice";
import {
  setChoosedFonts,
  unselectChoosedFont,
} from "../../features/choosedFontSlide";
import axios from "../../app/api/axios";

import Accordion from "./Accordion/Accordion";
import useFontUpload from "../../hooks/useFontUpload";

export default function Folder() {
  const dispatch = useDispatch();
  const fonts = useSelector((state) => state.fonts.value);
  const choosedFonts = useSelector((state) => state.choosedFonts.value);
  const userId = useSelector((state) => state.auth.userId);
  const folderRef = useRef();
  const csrfToken = useSelector((state) => state.csrf.csrfToken);

  const { fontUpload } = useFontUpload();
  // HANDLE CHANGING CHECKED FONT
  function handleFonts(name) {
    dispatch(toggleFontState({ fontName: name }));

    const selectedFont = fonts.find((font) => font.name === name);
    if (selectedFont) {
      if (!selectedFont.checked) {
        if (!choosedFonts.find((font) => font.name === name)) {
          dispatch(setChoosedFonts([...choosedFonts, selectedFont]));
        }
      } else {
        dispatch(unselectChoosedFont(selectedFont));
      }
    }
  }

  const dataAccordion = [
    { title: "Favorites fonts", isFavorite: true },
    { title: "All fonts", isFavorite: false },
  ];

  //RETURN________________________________________________________________________________________________________
  return (
    <>
      <section className={s.folder} ref={folderRef}>
        <Accordion
          data={dataAccordion}
          fonts={fonts}
          handleFonts={handleFonts}
        />
        <div className={s.inputFile__box}>
          <div className={s.inputFile}>
            <label htmlFor="inputFile" className={s.inputFile__label}>
              + Add font(s){" "}
            </label>
            <input
              id="inputFile"
              type="file"
              accept=".ttf,.otf,.woff"
              multiple
              onChange={(e) => fontUpload(e)}
              className={s.inputFile__input}
            />
          </div>
        </div>
      </section>
    </>
  );
}
