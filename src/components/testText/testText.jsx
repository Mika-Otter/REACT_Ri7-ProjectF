import React, { useState } from "react";
import s from "./testText.module.scss";
import cn from "classnames";
import { useSelector } from "react-redux";

export default function TestText() {
  const choosedFonts = useSelector((state) => state.choosedFonts.value);

  const [test, setTest] = useState("A quick brown fox jumps over the lazy dog");
  const [checkboxes, setCheckboxes] = useState({
    bigCheckbox: true,
    mediumCheckbox: false,
    smallCheckbox: false,
  });
  const [checked, setChecked] = useState(1);

  // PREVENT 0 CHECKED BOX
  const handleCheckbox = (checkboxName) => {
    if (checked === 1 && checkboxes[checkboxName]) {
      return;
    } else {
      checkboxes[checkboxName]
        ? setChecked((prev) => prev - 1)
        : setChecked((prev) => prev + 1);
    }

    const updatedCheckboxes = {
      ...checkboxes,
      [checkboxName]: !checkboxes[checkboxName],
    };
    setCheckboxes(updatedCheckboxes);
  };

  return (
    <>
      <section>
        <div className={s.test}>
          <div className={s.test__title}>
            <h2>Test fonts</h2>
          </div>
          <div className={s.test__text}>
            <input
              type="text"
              name="test"
              value={test}
              onChange={(e) => setTest(e.target.value)}
            />
          </div>
          <div className={s.test__buttons}>
            <input
              type="checkbox"
              className={s.checkbox}
              id="bigLine"
              checked={checkboxes.bigCheckbox}
              onChange={() => handleCheckbox("bigCheckbox")}
            />
            <label htmlFor="bigLine">Big line</label>

            <input
              type="checkbox"
              className={s.checkbox}
              id="mediumLine"
              checked={checkboxes.mediumCheckbox}
              onChange={() => handleCheckbox("mediumCheckbox")}
            />
            <label htmlFor="mediumLine">Medium line</label>

            <input
              type="checkbox"
              className={s.checkbox}
              id="smallLine"
              checked={checkboxes.smallCheckbox}
              onChange={() => handleCheckbox("smallCheckbox")}
            />
            <label htmlFor="smallLine">Small line</label>
          </div>
        </div>
        <div className={s.test__section}>
          {choosedFonts.length === 0 ? (
            <>
              <div className={s.paragraph__section}>
                <p className={s.nochoosedfont}>
                  Please select a font in your folder...
                </p>
                <p className={s.tips}>
                  TIPS ! You can select or deselect a font by clicking on its
                  card.
                </p>
              </div>
            </>
          ) : (
            choosedFonts.map((font, index) => (
              <div className={s.test__view} key={`font-${index}`}>
                {checkboxes.bigCheckbox && (
                  <span
                    key={`big-${font.name}`}
                    className={cn(`font-${font.name}`, s.test__view__big)}
                  >
                    {test}
                  </span>
                )}
                {checkboxes.mediumCheckbox && (
                  <span
                    key={`medium-${font.name}`}
                    className={cn(`font-${font.name}`, s.test__view__medium)}
                  >
                    {test}
                  </span>
                )}
                {checkboxes.smallCheckbox && (
                  <span
                    key={`small-${font.name}`}
                    className={cn(`font-${font.name}`, s.test__view__small)}
                  >
                    {test}
                  </span>
                )}
                <span key={index} className={s.test__view__typeface}>
                  {font.name}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
