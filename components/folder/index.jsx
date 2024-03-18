import React from "react";
import s from "./folder.module.scss";
import PropTypes from "prop-types";

export default function Folder({ fonts, setFonts, choosedFonts, setChoosedFonts }) {
    //update fonts
    function fileUpload(e) {
        const fontList = e.target.files;
        const fontsArray = [];

        for (let i = 0; i < fontList.length; i++) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fontName = fontList[i].name.split(".")[0]; //store fontName without .ext
                fontsArray.push({ name: fontName, url: e.target.result, state: false });
                if (fontsArray.length === fontList.length) {
                    setFonts(fontsArray);
                }
            };
            reader.readAsDataURL(fontList[i]);
        }
    }

    function handleFonts(name, state) {
        const selectedFont = fonts.find((font) => font.name === name); //find typeface by name
        if (selectedFont) {
            selectedFont.state = !selectedFont.state; //switch state
            setFonts([...fonts]); //set global fonts
            if (selectedFont.state) {
                setChoosedFonts([...choosedFonts, selectedFont]); //add to choosed
            } else {
                setChoosedFonts(choosedFonts.filter((font) => font !== selectedFont)); //remove to choosed
            }
            console.log(choosedFonts);
        }
    }
    return (
        <>
            <section className={s.folder}>
                <div className={s.folder__folder}>
                    <span>Main :</span>
                    {fonts.map((font) => (
                        <div className={s.fonts} key={font.name}>
                            <input
                                type="checkbox"
                                name={font.name}
                                checked={font.state}
                                onChange={() => handleFonts(font.name, font.state)}
                            />
                            <label htmlFor={font.name} style={{ fontFamily: `${font.name}` }}>
                                {font.name}
                            </label>
                        </div>
                    ))}
                </div>
                <div className={s.test__buttons}>
                    <input type="file" accept=".ttf,.otf" multiple onChange={fileUpload} />
                </div>
            </section>
        </>
    );
}

Folder.propTypes = {
    fonts: PropTypes.array.isRequired,
    setFonts: PropTypes.func.isRequired,
    choosedFonts: PropTypes.array.isRequired,
    setChoosedFonts: PropTypes.func.isRequired,
};
