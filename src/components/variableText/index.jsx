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
    const [addTitle, setAddTitle] = useState(false);

    function changeLineHeight(e) {
        const updatedLineHeight = parseFloat(e.target.value);
        setLineHeight(updatedLineHeight);
    }

    return (
        <>
            <section>
                <div className={s.box__variable}>
                    <div className={s.variable}>
                        <div className={s.variable__fontcard}>
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
                                <div className={s.range}>
                                    <button
                                        type="button"
                                        id={s.title__btn}
                                        className={addTitle ? s.withTitle : s.withoutTitle}
                                        onClick={() => setAddTitle(!addTitle)}
                                    >
                                        {addTitle ? (
                                            <span>With title</span>
                                        ) : (
                                            <span>Without title</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={s.paragraph__section}>
                            {addTitle ? (
                                <h1
                                    style={{
                                        fontSize: `${fontSize * 1.6}rem`,
                                        lineHeight: `${lineHeight * 0.6}%`,
                                        fontFamily: fontName,
                                        margin: 0,
                                        marginBottom: "20px",
                                    }}
                                >
                                    Lorem title
                                </h1>
                            ) : null}
                            <p
                                style={{
                                    fontSize: `${fontSize}rem`,
                                    lineHeight: `${lineHeight}%`,
                                    fontFamily: fontName,
                                    margin: 0,
                                }}
                            >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                                quas optio nihil nobis numquam voluptate, saepe nam est. Reiciendis
                                deleniti omnis corporis quaerat aliquid deserunt magni illo soluta
                                iusto exercitationem.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

VariableText.propTypes = {
    fontName: PropTypes.node.isRequired,
    font: PropTypes.node.isRequired,
};
