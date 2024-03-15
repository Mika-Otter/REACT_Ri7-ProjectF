import React, { useState } from "react";
import s from "./variableText.module.scss";

export default function Variable() {
    const [test, setTest] = useState("");
    const [bigLineChecked, setBigLineChecked] = useState(false);
    const [mediumLineChecked, setMediumLineChecked] = useState(false);
    const [smallLineChecked, setSmallLineChecked] = useState(false);

    const [fonts, setFonts] = useState([]);

    const fileUpload = (e) => {
        const fontList = e.target.files;
        const fontsArray = [];

        for (let i = 0; i < fontList.length; i++) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fontName = fontList[i].name.split(".")[0];
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
                <style key={index}>
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
                            checked={bigLineChecked}
                            onChange={() => setBigLineChecked(!bigLineChecked)}
                        />
                        <label htmlFor="bigLine">Big line</label>

                        <input
                            type="checkbox"
                            className={s.checkbox}
                            id="mediumLine"
                            checked={mediumLineChecked}
                            onChange={() => setMediumLineChecked(!mediumLineChecked)}
                        />
                        <label htmlFor="bigLine">Medium line</label>

                        <input
                            type="checkbox"
                            className={s.checkbox}
                            id="smallLine"
                            checked={smallLineChecked}
                            onChange={() => setSmallLineChecked(!smallLineChecked)}
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
                        {bigLineChecked && <span className={s.test__view__big}>{test}</span>}
                        {mediumLineChecked && <span className={s.test__view__medium}>{test}</span>}
                        {smallLineChecked && <span className={s.test__view__small}>{test}</span>}
                    </div>
                ))}
                ;
            </section>
        </>
    );
}
