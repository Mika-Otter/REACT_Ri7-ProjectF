import React, { useState, useEffect } from "react";
import s from "./AllFonts.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import useHandleFonts from "../../hooks/useHandleFonts";

export default function AllFonts() {
  const dispatch = useDispatch();
  const fonts = useSelector((state) => state.fonts.value);
  const choosedFonts = useSelector((state) => state.choosedFonts.value);

  const handleFonts = useHandleFonts(fonts, choosedFonts, dispatch);

  return (
    <>
      <section className={s.allfonts}>
        <div className={s.container__title}>
          <div className={s.title}>
            <h3>All your fonts</h3>
            <div className={s.title__paramas}>
              <span>Sort by</span>
              <span className={s.title__paramas__selector}>Rate</span>
            </div>
          </div>
        </div>
        <div className={s.content}>
          <div className={s.content__ctn}>
            {fonts.map((font, i) => (
              <Card
                font={font}
                i={i}
                key={font.name + i}
                handleFonts={handleFonts}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
