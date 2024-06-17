import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VariableText from "./VariableText/VariableText";

import s from "./Variable.module.scss";
import cn from "classnames";
import Card from "../Card/Card";
import useHandleFonts from "../../hooks/useHandleFonts";

export default function Variable() {
  const choosedFonts = useSelector((state) => state.choosedFonts.value);
  const fonts = useSelector((state) => state.fonts.value);
  const [addTitle, setAddTitle] = useState(false);

  return (
    <>
      <section className={s.variable}>
        <div className={s.variable__section}>
          <div className={s.variable__title}>
            <div className={s.variable__title__ctn}>
              <h3>Variable text</h3>
              <button
                type="button"
                id={s.title__btn}
                className={addTitle ? s.withTitle : s.withoutTitle}
                onClick={() => setAddTitle(!addTitle)}
              >
                {addTitle ? (
                  <span>With title</span>
                ) : (
                  <span>Without title</span>
                )}
              </button>
            </div>
          </div>
          <div>
            {choosedFonts.length === 0 ? (
              <div className={s.paragraph__section}>
                <p className={s.nochoosedfont}>
                  Please select a font in your folder...
                </p>
              </div>
            ) : (
              choosedFonts.map((font, i) => (
                <VariableText
                  fontName={font.name}
                  key={font.name + i}
                  font={font}
                  small={true}
                  i={i}
                  addTitle={addTitle}
                  choosedFonts={choosedFonts}
                  fonts={fonts}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
