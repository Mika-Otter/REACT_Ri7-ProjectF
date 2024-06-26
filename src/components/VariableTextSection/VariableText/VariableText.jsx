import React, { useState } from "react";
import s from "./VariableText.module.scss";
import Card from "../../Card/Card";
import { useDispatch } from "react-redux";
import { useHandleSelectedFonts } from "../../../hooks/useHandleSelectedFonts";
import VariableTextSlider from "./VariableTextSlider";
import VariableTextParagraph from "./VariableTextParagraph";

export default function VariableText({
  fontName,
  font,
  i,
  addTitle,
  choosedFonts,
  fonts,
}) {
  const dispatch = useDispatch();

  const [fontSize, setFontSize] = useState(2);
  const [lineHeight, setLineHeight] = useState(100);
  const [letterSpacing, setLetterSpacing] = useState(0);

  const handleFonts = useHandleSelectedFonts(fonts, choosedFonts, dispatch);

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
                <VariableTextSlider
                  label="Font-size"
                  value={fontSize}
                  min={0.3}
                  max={20}
                  step={0.1}
                  onChange={setFontSize}
                  unit="rem"
                />
                <VariableTextSlider
                  label="Letter-spacing"
                  value={letterSpacing}
                  min={-0.5}
                  max={20}
                  step={0.1}
                  onChange={setLetterSpacing}
                  unit="px"
                />
                <VariableTextSlider
                  label="Line-height"
                  value={lineHeight}
                  min={0}
                  max={200}
                  step={1}
                  onChange={setLineHeight}
                  unit="%"
                />
              </div>
            </div>

            <VariableTextParagraph
              fontSize={fontSize}
              lineHeight={lineHeight}
              letterSpacing={letterSpacing}
              fontName={fontName}
              addTitle={addTitle}
            />
          </div>
        </div>
      </section>
    </>
  );
}
