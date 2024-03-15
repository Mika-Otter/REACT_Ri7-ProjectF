import React, { useState } from "react";
import s from "./testText.module.scss";
import cn from "classnames";

export default function TestText({ fonts, choosedFonts }) {
    const [test, setTest] = useState("");
    const [checkboxes, setCheckboxes] = useState({
        bigCheckbox: true,
        mediumCheckbox: false,
        smallCheckbox: false,
    });

    // prevent to have 0 checkbox checked
    const handleCheckbox = (checkboxName) => {
        let countNumChecked = 0;
        for (const name in checkboxes) {
            if (checkboxes[name]) {
                countNumChecked++;
            }
        }
        if (checkboxes[checkboxName]) {
            countNumChecked--;
        } else {
            countNumChecked++;
        }

        console.log(countNumChecked);
        if (checkboxes[checkboxName] == true && countNumChecked === 0) {
            return;
        } else {
            const updatedCheckboxes = { ...checkboxes, [checkboxName]: !checkboxes[checkboxName] };
            setCheckboxes(updatedCheckboxes);
        }
    };

    return (
        <>
            {fonts.map((font, index) => (
                <style key={`style-${index}`}>
                    {`
                        @font-face {
                            font-family: '${font.name}';
                            src: url(${font.url}) format('truetype');
                        }

                        .font-${font.name} {
                            font-family: '${font.name}', sans-serif;
                        }
                    `}
                </style>
            ))}
            <section>
                <div className={s.test}>
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
            </section>
            <section>
                {choosedFonts.map((font, index) => (
                    <div className={s.test__view} key={`font-${index}`}>
                        {checkboxes.bigCheckbox && (
                            <span
                                key={`big-${font.name}`}
                                className={cn(`font-${font.name}`, s.test__view__big)}
                            >
                                {test == "" ? "It's a magical thing" : test}
                            </span>
                        )}
                        {checkboxes.mediumCheckbox && (
                            <span
                                key={`medium-${font.name}`}
                                className={cn(`font-${font.name}`, s.test__view__medium)}
                            >
                                {test == "" ? "It's a magical thing" : test}
                            </span>
                        )}
                        {checkboxes.smallCheckbox && (
                            <span
                                key={`small-${font.name}`}
                                className={cn(`font-${font.name}`, s.test__view__small)}
                            >
                                {test == "" ? "It's a magical thing" : test}
                            </span>
                        )}
                        <span key={index} className={s.test__view__typeface}>
                            {font.name}
                        </span>
                    </div>
                ))}
            </section>
        </>
    );
}
