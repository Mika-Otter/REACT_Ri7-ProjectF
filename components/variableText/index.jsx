import React, { useState } from "react";
import s from "./variableText.module.scss";
import cn from "classnames";

export default function VariableText() {
    const [fontSize, setFonSize] = useState(2);
    const [lineHeight, setLineHeight] = useState(30);

    function changeLineHeight(e) {
        const updatedLineHeight = parseFloat(e.target.value) + 50;
        setLineHeight(updatedLineHeight);
    }

    return (
        <>
            <section>
                <div className={s.variable}>
                    <div className={cn(s.fontSize, s.range)}>
                        <label for="fontSize">Font-size : {fontSize}</label>
                        <input
                            type="range"
                            min={0.3}
                            max={20}
                            step={0.1}
                            name="fontSize"
                            value={fontSize}
                            onChange={(e) => setFonSize(parseFloat(e.target.value))}
                        />
                    </div>
                    <div className={cn(s.lineHeight, s.range)}>
                        <label for="fontSize">Line-height : {lineHeight} %</label>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            step={1}
                            name="lineHeight"
                            value={lineHeight - 50}
                            onChange={(e) => changeLineHeight(e)}
                        />
                    </div>
                </div>
                <p style={{ fontSize: `${fontSize}rem`, lineHeight: `${lineHeight}%` }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quas optio
                    nihil nobis numquam voluptate, saepe nam est. Reiciendis deleniti omnis corporis
                    quaerat aliquid deserunt magni illo soluta iusto exercitationem.
                </p>
            </section>
        </>
    );
}
