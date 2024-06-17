import React, { useState } from "react";
import s from "./VariableText.module.scss";
import cn from "classnames";
import Card from "../../Card/Card";
import { useDispatch } from "react-redux";
import useHandleFonts from "../../../hooks/useHandleFonts";

export default function VariableText({
  fontName,
  font,
  i,
  addTitle,
  choosedFonts,
  fonts,
}) {
  const dispatch = useDispatch();

  const [fontSize, setFonSize] = useState(2);
  const [lineHeight, setLineHeight] = useState(100);
  const [letterSpacing, setLetterSpacing] = useState(0);

  const handleFonts = useHandleFonts(fonts, choosedFonts, dispatch);

  console.log(fonts);

  function changeLineHeight(e) {
    const updatedLineHeight = parseFloat(e.target.value);
    setLineHeight(updatedLineHeight);
  }

  return (
    <>
      <section>
        <div className={s.box__variableText}>
          <div className={s.variableText}>
            <div className={s.variableText__fontcard}>
              <div className={s.variableText__fontcard__ctn}>
                <Card
                  font={font}
                  handleFonts={handleFonts}
                  i={i}
                  key={font.name + i}
                  small={true}
                />
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

                <div className={cn(s.letterSpacing, s.range)}>
                  <label htmlFor="letterSpacing" className={s.range__label}>
                    Letter-spacing
                  </label>

                  <input
                    className={s.input__range}
                    type="range"
                    min={-0.5}
                    max={20}
                    step={0.1}
                    name="letterSpacing"
                    value={letterSpacing}
                    onChange={(e) =>
                      setLetterSpacing(parseFloat(e.target.value))
                    }
                  />
                  <span className={s.range__span}>{letterSpacing} px</span>
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
                    letterSpacing: `${letterSpacing}px`,
                    fontFamily: fontName,
                    margin: 0,
                    marginBottom: "20px",
                  }}
                >
                  The title
                </h1>
              ) : null}
              <p
                className={s.paragraph__section__text}
                style={{
                  fontSize: `${fontSize}rem`,
                  lineHeight: `${lineHeight}%`,
                  letterSpacing: `${letterSpacing}px`,
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
