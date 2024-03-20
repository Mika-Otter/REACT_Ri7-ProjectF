import React from "react";
import s from "./folder.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleFontState } from "../../features/fontsSlice";
import { setChoosedFonts } from "../../features/choosedFontSlide";
import axios from "../../app/api/axios";

export default function Folder() {
    const dispatch = useDispatch();
    const fonts = useSelector((state) => state.fonts.value);
    const choosedFonts = useSelector((state) => state.choosedFonts.value);
    const userId = useSelector((state) => state.auth.userId);

    //update fonts
    // function fileUpload(e) {
    //     const fontList = e.target.files;
    //     const fontsArray = [];

    //     for (let i = 0; i < fontList.length; i++) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             const fontName = fontList[i].name.split(".")[0]; //store fontName without .ext
    //             fontsArray.push({ name: fontName, url: e.target.result, state: false });
    //             if (fontsArray.length === fontList.length) {
    //                 dispatch(setFonts(fontsArray));
    //             }
    //         };
    //         reader.readAsDataURL(fontList[i]);
    //     }
    //     console.log(fonts);
    // }

    async function fileUpload(e, userId) {
        const fontList = e.target.files;

        const formData = new FormData(); // Créez un nouvel objet FormData

        for (let i = 0; i < fontList.length; i++) {
            formData.append("files", fontList[i]); // Ajoutez chaque fichier à l'objet FormData
        }
        try {
            const res = await axios.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    userId: userId, // Passer l'userId comme en-tête de la requête
                },
            });
            console.log(res.data);
        } catch (err) {
            console.error("Failed to upload files :", err);
        }
    }

    function handleFonts(name) {
        dispatch(toggleFontState({ fontName: name }));
        const selectedFont = fonts.find((font) => font.name === name); // Trouver la police sélectionnée par son nom
        if (selectedFont) {
            if (!selectedFont.state) {
                if (!choosedFonts.find((font) => font.name === name)) {
                    dispatch(setChoosedFonts([...choosedFonts, selectedFont]));
                }
            } else {
                dispatch(setChoosedFonts(choosedFonts.filter((font) => font.name !== name)));
            }
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
                                onChange={() => handleFonts(font.name)}
                            />
                            <label htmlFor={font.name} style={{ fontFamily: `${font.name}` }}>
                                {font.name}
                            </label>
                        </div>
                    ))}
                </div>
                <div className={s.test__buttons}>
                    <input
                        type="file"
                        accept=".ttf,.otf"
                        multiple
                        onChange={(e) => fileUpload(e, userId)}
                    />
                </div>
            </section>
        </>
    );
}
