import React from "react";
import s from "./Folder.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "./Accordion/Accordion";
import useFontUpload from "../../hooks/useFontUpload";
import { useHandleSelectedFonts } from "../../hooks/useHandleSelectedFonts";

export default function Folder() {
  const dispatch = useDispatch();
  const fonts = useSelector((state) => state.fonts.value);
  const choosedFonts = useSelector((state) => state.choosedFonts.value);

  const { fontUpload } = useFontUpload();
  const { handleFonts } = useHandleSelectedFonts(fonts, choosedFonts, dispatch);

  const dataAccordion = [
    { title: "Favorites fonts", isFavorite: true },
    { title: "All fonts", isFavorite: false },
  ];

  return (
    <>
      <section className={s.folder}>
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
