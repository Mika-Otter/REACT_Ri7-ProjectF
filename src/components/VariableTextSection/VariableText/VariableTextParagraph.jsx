import React from "react";
import s from "./VariableText.module.scss";

export default function VariableTextParagraph({
  fontSize,
  lineHeight,
  letterSpacing,
  fontName,
  addTitle,
}) {
  <div className={s.paragraph__section}>
    {addTitle && (
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
    )}
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
      Contrast is a term that gets used to describe a wide variety of mediums
      including music, food, paintings, and even typography. When describing
      type in terms of contrast, what you’re referring to is the balance between
      black and white on your page — if you were to set everything to greyscale
      of course. You can affect the contrast of your type by adjusting elements
      such as kerning, leading, font size, font weight, and margins. Learning
      how to adjust them to create a harmonious balance within your composition
      is the trick.
    </p>
  </div>;
}
