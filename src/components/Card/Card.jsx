import React, { useState, useEffect } from "react";
import s from "./Card.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../app/api/axios";
import {
  toggleFavorite,
  deleteFont,
  toggleFontState,
} from "../../features/fontsSlice";
import { setChoosedFonts } from "../../features/choosedFontSlide";
import FavoriteEmptySVG from "../SVG/FavoriteInactiveSVG";
import FavoriteAciveSVG from "../SVG/FavoriteActiveSVG";
import SettingsFont from "../SettingsFont/SettingsFont";

export default function Card({ font, i, handleFonts, small }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const username = useSelector((state) => state.auth.username);
  const fonts = useSelector((state) => state.fonts.value);
  const choosedFonts = useSelector((state) => state.choosedFonts.value);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const userId = useSelector((state) => state.auth.userId);
  const [text, setText] = useState("");

  const [ratings, setRatings] = useState({});

  // _HANDLE RATE FAVORITE ______________________________________________________________________________
  const handleRating = (userId, fontId, fontName, rating) => {
    setRatings((prev) => ({
      ...prev,
      [fontName]: rating,
    }));
    sendRate(userId, fontId, rating);
  };

  const sendRate = async (userId, fontId, rating) => {
    try {
      const res = await axios.post("/fonts/rate", { userId, fontId, rating });
      return res.status === 200;
    } catch (err) {
      console.error("FAILED : Try to rate typeface => ", err);
    }
  };

  const getRate = async (userId) => {
    try {
      const res = await axios.post("/fonts/rate/getAll", { userId });
      const fontRates = res.data.data;
      fontRates.forEach((rate) => {
        setRatings((prev) => ({
          ...prev,
          [rate.fontName]: rate.rating,
        }));
      });
    } catch (err) {
      console.error("FAILED : Try to get all rates => ", err);
    }
  };

  // _HANDLE FAVORITE ______________________________________________________________________________
  const handleFavorite = (userId, fontId, state) => {
    dispatch(toggleFavorite({ fontId: fontId, favorite: state }));
    sendFavorite(userId, fontId, state);
  };

  const sendFavorite = async (userId, fontId, state) => {
    try {
      const res = await axios.post("/fonts/favorite", {
        userId,
        fontId,
        state,
      });
      return res.status === 200;
    } catch (err) {
      console.error("FAILED : Try to handle favorite => ", err);
    }
  };

  const getFavorites = async (userId) => {
    try {
      const res = await axios.post("/fonts/favorite/getAll", { userId });
      const data = res.data.data;
      data.forEach((favorite) => {
        dispatch(toggleFavorite({ fontId: favorite.fontId, favorite: true }));
      });
      return res.status === 200;
    } catch (err) {
      console.error("FAILED : Try to get all favorites =>, ", err);
    }
  };

  // DELETE FONTS____________________________________________________________________________
  const deleteFonts = async (fontId) => {
    try {
      dispatch(deleteFont(fontId));
      const res = await axios.post("/fonts/delete", { fontId });
      return res.status === 200;
    } catch (err) {
      console.error("FAILED : Try to delete typo => ", err);
    }
  };

  // GO TO _________(can be update in one function ?)___________________________________________________________________
  const gotoTest = (fontId) => {
    //select and add the selected font to choosedfonts before go to /fontest
    const selectedFont = fonts.find((font) => font.id === fontId);
    if (!selectedFont.checked) {
      dispatch(toggleFontState({ fontName: selectedFont.name }));
      dispatch(setChoosedFonts([...choosedFonts, selectedFont]));
    }
    navigate("/fonttest");
  };

  const gotoVariable = (fontId) => {
    //select and add the selected font to choosedfonts before go to /variable
    const selectedFont = fonts.find((font) => font.id === fontId);
    if (!selectedFont.checked) {
      dispatch(toggleFontState({ fontName: selectedFont.name }));
      dispatch(setChoosedFonts([...choosedFonts, selectedFont]));
    }
    navigate("/variable");
  };

  const listSentences = [
    "Amazingly few discotheques provide jukeboxes.",
    "Back in June we delivered oxygen equipment of the same size.",
    "Crazy Fredrick bought many very exquisite opal jewels.",
    "Few black taxis drive up major roads on quiet hazy nights.",
    "Grumpy wizards make toxic brew for the evil Queen and Jack.",
    "Jackdaws love my big sphinx of quartz.",
    "Jinxed wizards pluck ivy from the big quilt.",
    "Pack my box with five dozen liquor jugs.",
    "The quick brown fox jumps over the lazy dog.",
    "The five boxing wizards jump quickly.",
    "Vampire bats quizzed Jim Crow about the next weapon.",
    "Waltz, bad nymph, for quick jigs vex.",
    "How razorback-jumping frogs can level six piqued gymnasts!",
    "Cozy lummox gives smart squid who asks for job pen.",
    "A quick movement of the enemy will jeopardize six gunboats.",
    "All questions asked by five watch experts amazed the judge.",
    "The quick onyx goblin jumps over the lazy dwarf.",
  ];

  useEffect(() => {
    setText(listSentences[Math.floor(Math.random() * listSentences.length)]);
  }, []);

  // OTHERS__________________________________________________________________________________

  useEffect(() => {
    const fetchData = async () => {
      await getRate(userId);
      await getFavorites(userId);
      setFontsLoaded(true);
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (fonts.length > 0) {
      setFontsLoaded(true);
    }
  }, [fonts]);

  if (!fontsLoaded) {
    return <div className={s.loading}></div>;
  }

  return (
    <>
      <div
        className={small ? s.card__small : s.card}
        key={font.name + i}
        onClick={() => handleFonts(font.name)}
      >
        <div className={s.card__settings}>
          <SettingsFont
            font={font}
            userId={userId}
            ratings={ratings}
            handleRating={handleRating}
            deleteFonts={deleteFonts}
          />
        </div>
        <div className={s.card__box}>
          <div className={s.card__letter} style={{ fontFamily: font.name }}>
            <span className={s.card__letter__letters}>Aa</span>
            <div className={s.card__letter__text}>{text}</div>
          </div>
          <div className={s.card__details}>
            <div className={s.card__details__name}>
              <span>{font.name}</span>
            </div>
            <div className={s.card__details__links}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  gotoVariable(font.id);
                }}
                className={s.card__details__links__variable}
              >
                Variable text
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  gotoTest(font.id);
                }}
                className={s.card__details__links__test}
              >
                Line font test
              </button>
            </div>
          </div>
        </div>
        {!small && (
          <div className={s.card__favorite}>
            <div className={s.card__favorite__ctn}>
              <input
                className={s.card__favorite__ctn__input}
                type="checkbox"
                checked={font.favorite ? font.favorite : false}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  handleFavorite(userId, font.id, e.target.checked);
                }}
              />
              {font.favorite ? <FavoriteAciveSVG /> : <FavoriteEmptySVG />}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
