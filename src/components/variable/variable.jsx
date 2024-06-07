import React, { useState } from "react";
import { useSelector } from "react-redux";

import CardFont from "../cardFont/cardFont";

import s from "./Variable.module.scss";
import cn from "classnames";

export default function Variable() {
  const choosedFonts = useSelector((state) => state.choosedFonts.value);
  const [addTitle, setAddTitle] = useState(false);

  return (
    <>
      <section>
        <div className={s.variable__section}>
          <div className={s.variable__title}>
            <h2>Variable text</h2>
            <button
              type="button"
              id={s.title__btn}
              className={addTitle ? s.withTitle : s.withoutTitle}
              onClick={() => setAddTitle(!addTitle)}
            >
              {addTitle ? <span>With title</span> : <span>Without title</span>}
            </button>
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
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function VariableText({ fontName, font, i, addTitle, choosedFonts }) {
  const [fontSize, setFonSize] = useState(2);
  const [lineHeight, setLineHeight] = useState(100);

  function changeLineHeight(e) {
    const updatedLineHeight = parseFloat(e.target.value);
    setLineHeight(updatedLineHeight);
  }

  return (
    <>
      <section>
        <div className={s.box__variable}>
          <div className={s.variable}>
            <div className={s.variable__fontcard}>
              <div className={s.fontcard__ctn}>
                <CardFont font={font} small={true} i={i} />
              </div>
              <div className={s.cursor__box}>
                <div className={cn(s.fontSize, s.range)}>
                  <label htmlFor="fontSize" className={s.range__label}>
                    Font-size{" "}
                  </label>

                  <input
                    className={s.input__range}
                    type="range"
                    min={0.3}
                    max={20}
                    step={0.1}
                    name="fontSize"
                    value={fontSize}
                    onChange={(e) => setFonSize(parseFloat(e.target.value))}
                  />
                  <span className={s.range__span}>{fontSize} rem</span>
                </div>

                <div className={cn(s.lineHeight, s.range)}>
                  <label htmlFor="fontSize" className={s.range__label}>
                    Line-height
                  </label>
                  <input
                    className={s.input__range}
                    type="range"
                    min={0}
                    max={200}
                    step={1}
                    name="lineHeight"
                    value={lineHeight}
                    onChange={(e) => changeLineHeight(e)}
                  />
                  <span className={s.range__span}>{lineHeight} %</span>
                </div>
                <div className={s.range}></div>
              </div>
            </div>

            <div className={s.paragraph__section}>
              {addTitle ? (
                <h1
                  style={{
                    fontSize: `${fontSize * 1.6}rem`,
                    lineHeight: `${lineHeight * 0.6}%`,
                    fontFamily: fontName,
                    margin: 0,
                    marginBottom: "20px",
                  }}
                >
                  Title
                </h1>
              ) : null}
              <p
                style={{
                  fontSize: `${fontSize}rem`,
                  lineHeight: `${lineHeight}%`,
                  fontFamily: fontName,
                  margin: 0,
                }}
              >
                Contrast is a term that gets used to describe a wide variety of
                mediums including music, food, paintings, and even typography.
                When describing type in terms of contrast, what you&rsquo;re
                referring to is the balance between black and white on your page
                — if you were to set everything to greyscale of course. You can
                affect the contrast of your type by adjusting elements such as
                kerning, leading, font size, font weight, and margins. Learning
                how to adjust them to create a harmonious balance within your
                composition is the trick.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
