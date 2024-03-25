import React, { useState } from "react";
import s from "./variableText.module.scss";
import cn from "classnames";
import Folder from "../folder";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import CardFont from "../cardFont";

export default function Variable() {
    const choosedFonts = useSelector((state) => state.choosedFonts.value);

    return (
        <>
            <Folder />
            <div>
                {choosedFonts.map((font, i) => (
                    <VariableText fontName={font.name} key={i} font={font} small={true} />
                ))}
            </div>
        </>
    );
}

function VariableText({ fontName, font }) {
    const [fontSize, setFonSize] = useState(2);
    const [lineHeight, setLineHeight] = useState(100);

    function changeLineHeight(e) {
        const updatedLineHeight = parseFloat(e.target.value);
        setLineHeight(updatedLineHeight);
    }

    return (
        <>
            <section>
                <div className={s.variable}>
                    <div className={s.fontcard__ctn}>
                        <CardFont font={font} small={true} />
                    </div>
                    <div className={s.cursor__box}>
                        <div className={cn(s.fontSize, s.range)}>
                            <label htmlFor="fontSize">Font-size : {fontSize}</label>
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
                            <label htmlFor="fontSize">Line-height : {lineHeight} %</label>
                            <input
                                type="range"
                                min={0}
                                max={200}
                                step={1}
                                name="lineHeight"
                                value={lineHeight}
                                onChange={(e) => changeLineHeight(e)}
                            />
                        </div>
                    </div>
                </div>
                <p
                    style={{
                        fontSize: `${fontSize}rem`,
                        lineHeight: `${lineHeight}%`,
                        fontFamily: fontName,
                    }}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quas optio
                    nihil nobis numquam voluptate, saepe nam est. Reiciendis deleniti omnis corporis
                    quaerat aliquid deserunt magni illo soluta iusto exercitationem.
                </p>
            </section>
        </>
    );
}

VariableText.propTypes = {
    fontName: PropTypes.node.isRequired,
    font: PropTypes.node.isRequired,
};
