import React, { useState } from "react";
import s from "./VariableTextSection.module.scss";
import { useSelector } from "react-redux";
import VariableText from "./VariableText/VariableText";

export default function VariableTextSection() {
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
                <p className={s.tips}>
                  TIPS ! You can select or deselect a font by clicking on its
                  card.
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
