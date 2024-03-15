import React, { useState } from "react";
import s from "./testText.module.scss";
import cn from "classnames";

export default function TestText() {
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
        if (checkboxes[checkboxName] == true && countNumChecked === 0) {
            return;
        } else {
            const updatedCheckboxes = { ...checkboxes, [checkboxName]: !checkboxes[checkboxName] };
            setCheckboxes(updatedCheckboxes);
        }
    };

    //update fonts
    const [fonts, setFonts] = useState([]);
    const fileUpload = (e) => {
        const fontList = e.target.files;
        const fontsArray = [];

        for (let i = 0; i < fontList.length; i++) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fontName = fontList[i].name.split(".")[0]; //store fontName without .ext
                fontsArray.push({ name: fontName, url: e.target.result });
                if (fontsArray.length === fontList.length) {
                    setFonts(fontsArray);
                }
            };
            reader.readAsDataURL(fontList[i]);
        }
    };

    return (
        <>
            {fonts.map((font, index) => (
                <style>
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
                        <label htmlFor="bigLine">Medium line</label>

                        <input
                            type="checkbox"
                            className={s.checkbox}
                            id="smallLine"
                            checked={checkboxes.smallCheckbox}
                            onChange={() => handleCheckbox("smallCheckbox")}
                        />
                        <label htmlFor="bigLine">Small line</label>
                    </div>
                    <div className={s.test__buttons}>
                        <input type="file" accept=".ttf,.otf" multiple onChange={fileUpload} />
                    </div>
                </div>
            </section>
            <section>
                {fonts.map((font, index) => (
                    <div className={s.test__view}>
                        {checkboxes.bigCheckbox && (
                            <span className={cn(`font-${font.name}`, s.test__view__big)}>
                                {test == "" ? "It's a magical thing" : test}
                            </span>
                        )}
                        {checkboxes.mediumCheckbox && (
                            <span className={cn(`font-${font.name}`, s.test__view__medium)}>
                                {test == "" ? "It's a magical thing" : test}
                            </span>
                        )}
                        {checkboxes.smallCheckbox && (
                            <span className={cn(`font-${font.name}`, s.test__view__small)}>
                                {test == "" ? "It's a magical thing" : test}
                            </span>
                        )}
                        <span className={s.test__view__typeface}>{font.name}</span>
                    </div>
                ))}
            </section>
        </>
    );
}
