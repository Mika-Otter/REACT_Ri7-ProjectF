import React, { useEffect, useState, useRef } from "react";
import s from "./Folder.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { setFonts, toggleFontState } from "../../features/fontsSlice";
import {
  deleteChoosedFont,
  setChoosedFonts,
} from "../../features/choosedFontSlide";
import axios from "../../app/api/axios";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Accordion from "./Accordion/Accordion";

export default function Folder() {
  const dispatch = useDispatch();
  const fonts = useSelector((state) => state.fonts.value);
  const choosedFonts = useSelector((state) => state.choosedFonts.value);
  const userId = useSelector((state) => state.auth.userId);
  const [folder, setFolder] = useState(true);
  const folderRef = useRef();

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

  //TEST
  // useEffect(() => {
  //     console.log("Choooosed", choosedFonts);
  // }, [choosedFonts]);

  const dataAccordion = [
    { title: "Favorites fonts", isFavorite: true },
    { title: "All fonts", isFavorite: false },
  ];

  //RETURN________________________________________________________________________________________________________
  return (
    <>
      <section className={s.folder} ref={folderRef}>
        <Accordion
          data={dataAccordion}
          fonts={fonts}
          handleFonts={handleFonts}
        />
        <div className={s.inputFile__box}>
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
        </div>
      </section>
    </>
  );
}