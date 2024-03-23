import React, { useEffect } from "react";
import s from "./folder.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setFonts, toggleFontState } from "../../features/fontsSlice";
import { setChoosedFonts } from "../../features/choosedFontSlide";
import axios from "../../app/api/axios";
import Logout from "../logout";

export default function Folder() {
    const dispatch = useDispatch();
    const fonts = useSelector((state) => state.fonts.value);
    const choosedFonts = useSelector((state) => state.choosedFonts.value);
    const userId = useSelector((state) => state.auth.userId);

    async function fileUpload(e) {
        const fontList = e.target.files;

        const formData = new FormData();

        for (let i = 0; i < fontList.length; i++) {
            formData.append("files", fontList[i]);
            formData.append("fontNames", fontList[i].name);
        }

        formData.append("userId", userId);
        try {
            const res = await axios.post("/upload/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.status === 200) {
                const newFonts = res.data.fonts;
                console.log(newFonts, "NEEEEWS");
                newFonts.forEach((font) => {
                    dispatch(setFonts({ name: font.name, url: font.url, id: font.id }));
                });
            }
        } catch (err) {
            console.error("Failed to upload files :", err);
        }
    }

    // GET FONTSNAME FOR A USER
    async function getUserFonts() {
        try {
            const res = await axios.post("/fonts/getAll", { userId });
            if (res.status === 200) {
                const fontsData = res.data.fonts;
                fontsData.forEach((font) => {
                    if (!fonts.some((existingFont) => existingFont.name === font.name)) {
                        dispatch(setFonts({ name: font.name, url: font.url, id: font.id }));
                    }
                });
            } else {
                console.error("Failed to fetch user fonts: ", res.statusText);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getUserFonts();
    }, []);

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

    useEffect(() => {
        console.log(choosedFonts);
    }, [choosedFonts]);
    return (
        <>
            <section className={s.folder}>
                <div className={s.folder__folder}>
                    <span>Main :</span>
                    {fonts.map((font, i) => (
                        <div className={s.fonts} key={font.name + i}>
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
                        onChange={(e) => fileUpload(e)}
                    />
                </div>
                <Logout />
                <Link to="/profil">Profil</Link>
                <Link to="/home">Home</Link>
                <Link to="/variable">Variable</Link>
                <Link to="/fonttest">Font test</Link>
            </section>
        </>
    );
}

// async function fetchTyposFromServer() {
//     try {
//         const res = await axios.get("/static/upload/test.otf");
//         const fontUrl = res.request.responseURL; // Obtenez l'URL de la police
//     } catch (err) {
//         console.error("Failed to fetch typos from server : ", err);
//     }
// }
