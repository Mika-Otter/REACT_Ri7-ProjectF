import React, { useState } from "react";
import s from "./testText.module.scss";
import cn from "classnames";
import { useSelector } from "react-redux";
import Folder from "../folder/folder";
import Menu from "../menu/menu";
// import { setFonts } from "../../src/features/fonts/fontsSlice";

export default function TestText() {
    const choosedFonts = useSelector((state) => state.choosedFonts.value);

    const [test, setTest] = useState("A quick brown fox jumps over the lazy dog");
    const [checkboxes, setCheckboxes] = useState({
        bigCheckbox: true,
        mediumCheckbox: false,
        smallCheckbox: false,
    });

    // PREVENT 0 CHECKED BOX
    const handleCheckbox = (checkboxName) => {
        let countNumChecked = 0;
        for (const name in checkboxes) {
            if (checkboxes[name]) {
                countNumChecked++;
            }
        }
        countNumChecked = checkboxes[checkboxName] ? countNumChecked-- : countNumChecked++;

        if (checkboxes[checkboxName] === true && countNumChecked === 0) {
            return;
        } else {
            const updatedCheckboxes = { ...checkboxes, [checkboxName]: !checkboxes[checkboxName] };
            setCheckboxes(updatedCheckboxes);
        }
    };

    return (
        <>
            <section>
                <Menu />
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
            <section className={s.test__section}>
                {choosedFonts.map((font, index) => (
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
                ))}
                <Folder />
            </section>
        </>
    );
}
