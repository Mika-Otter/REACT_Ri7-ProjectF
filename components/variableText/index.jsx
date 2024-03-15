import React, { useState } from "react";
import s from "./variableText.module.scss";

export default function Variable() {
    const [test, setTest] = useState("");
    const [bigLineChecked, setBigLineChecked] = useState(false);
    const [mediumLineChecked, setMediumLineChecked] = useState(false);
    const [smallLineChecked, setSmallLineChecked] = useState(false);

    return (
        <>
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
                </div>
            </section>
            <section>
                <div className={s.test__view}>
                    {bigLineChecked && <p>{test}</p>}
                    {mediumLineChecked && <p>{test}</p>}
                    {smallLineChecked && <p>{test}</p>}
                </div>
            </section>
        </>
    );
}
