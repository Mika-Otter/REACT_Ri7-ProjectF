import React, { useEffect, useState, useRef } from "react";
import s from "./folder.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { setFonts, toggleFontState } from "../../features/fontsSlice";
import { deleteChoosedFont, setChoosedFonts } from "../../features/choosedFontSlide";
import axios from "../../app/api/axios";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Folder() {
    const dispatch = useDispatch();
    const fonts = useSelector((state) => state.fonts.value);
    const choosedFonts = useSelector((state) => state.choosedFonts.value);
    const userId = useSelector((state) => state.auth.userId);
    const [folder, setFolder] = useState(false);
    const folderRef = useRef();
    const cacheRef = useRef();

    // UPLOAD A NEW TYPEFACE
    const fileUpload = async (e) => {
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
                    Authorization: localStorage.getItem("token"), //send token from localStorage //CHANGE TO SESSION STORAGE !!!
                },
            });
            if (res.status === 200) {
                const newFonts = res.data.fonts;
                newFonts.forEach((font) => {
                    dispatch(setFonts({ name: font.name, url: font.url, id: font.id }));
                });
            }
        } catch (err) {
            console.error("Failed to upload files :", err);
        }
    };

    // GET FONT USER'S FONTS
    const getUserFonts = async () => {
        try {
            const res = await axios.post("/fonts/getAll", { userId });
            if (res.status === 200) {
                const fontsData = res.data.fonts;
                fontsData.forEach((font) => {
                    if (!fonts.some((existingFont) => existingFont.name === font.name)) {
                        dispatch(
                            setFonts({
                                name: font.name,
                                url: font.url,
                                id: font.id,
                            })
                        );
                    }
                });
            } else {
                console.error("Failed to fetch user fonts: ", res.statusText);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getUserFonts(); //First rendering get all user's fonts
    }, []);

    // HANDLE CHANGING CHECKED FONT
    function handleFonts(name) {
        dispatch(toggleFontState({ fontName: name })); //reverse state

        const selectedFont = fonts.find((font) => font.name === name); //Find font by name
        if (selectedFont) {
            if (!selectedFont.checked) {
                //Add font if not checked and font name doesn't already exist
                if (!choosedFonts.find((font) => font.name === name)) {
                    dispatch(setChoosedFonts([...choosedFonts, selectedFont]));
                }
            } else {
                dispatch(deleteChoosedFont(selectedFont)); //if font already exist delete
            }
        }
    }

    function handleFolder() {
        setFolder(!folder);
    }

    useGSAP(() => {
        if (folder) {
            gsap.to(folderRef.current, { right: "-14vw", duration: 1.3 });
            gsap.to(cacheRef.current, { opacity: 1, duration: 1.3, zIndex: 100 });
        } else {
            gsap.to(folderRef.current, { right: 0, duration: 1.3, ease: "power3.inOut" });
            gsap.to(cacheRef.current, { opacity: 0, duration: 1.3, zIndex: -1 });
        }
    }, [folder]);
    //TEST
    // useEffect(() => {
    //     console.log("Choooosed", choosedFonts);
    // }, [choosedFonts]);

    //RETURN________________________________________________________________________________________________________
    return (
        <>
            <section className={s.folder} ref={folderRef}>
                <div className={s.folder__title}>
                    <h3 onClick={() => handleFolder()}>{folder ? "F" : "Folder"}</h3>
                </div>
                {folder ? <div className={s.cache} ref={cacheRef}></div> : null}
                <span className={s.folder__name}>Favorites fonts</span>
                <div className={s.folder__folder__favorite}>
                    {fonts.map((font, i) =>
                        font.favorite ? (
                            <div className={s.fonts} key={font.name + i}>
                                <input
                                    type="checkbox"
                                    name={font.name}
                                    checked={font.checked}
                                    onChange={() => handleFonts(font.name)}
                                />
                                <label htmlFor={font.name} style={{ fontFamily: `${font.name}` }}>
                                    {font.name}
                                </label>
                            </div>
                        ) : (
                            ""
                        )
                    )}
                </div>
                <span className={s.folder__name}>All fonts</span>
                <div className={s.folder__folder}>
                    {fonts.map((font, i) => (
                        <div className={s.fonts} key={font.name + i}>
                            <input
                                type="checkbox"
                                name={font.name}
                                checked={font.checked}
                                onChange={() => handleFonts(font.name)}
                            />
                            <label htmlFor={font.name} style={{ fontFamily: `${font.name}` }}>
                                {font.name}
                            </label>
                        </div>
                    ))}
                </div>

                <div className={s.inputFile}>
                    <label htmlFor="inputFile" className={s.inputFile__label}>
                        + Add font(s){" "}
                    </label>
                    <input
                        id="inputFile"
                        type="file"
                        accept=".ttf,.otf"
                        multiple
                        onChange={(e) => fileUpload(e)}
                        className={s.inputFile__input}
                    />
                </div>
            </section>
        </>
    );
}