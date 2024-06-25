import React, { useState, useEffect, useRef } from "react";
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
import { listSentences } from "./listSentencesData";

export default function Card({ font, i, handleFonts, small, onRatingChange }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fonts = useSelector((state) => state.fonts.value);
  const choosedFonts = useSelector((state) => state.choosedFonts.value);
  const userId = useSelector((state) => state.auth.userId);
  const csrfToken = useSelector((state) => state.csrf.csrfToken);

  const [fontsLoaded, setFontsLoaded] = useState(false);
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
      const res = await axios.post(
        "/fonts/rate",
        { userId, fontId, rating },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );
      return res.status === 200;
    } catch (err) {
      console.error("FAILED : Try to rate typeface => ", err);
    }
  };

  const getRate = async (userId) => {
    try {
      const res = await axios.post(
        "/fonts/rate/getAll",
        { userId },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );
      const fontRates = res.data.data;
      fontRates.forEach((rate) => {
        setRatings((prev) => ({
          ...prev,
          [rate.fontName]: rate.rating,
        }));
      });
    } catch (err) {
      console.error("FAILED : Try to get all rates Card => ", err);
    }
  };

  // _HANDLE FAVORITE ______________________________________________________________________________
  const handleFavorite = (userId, fontId, state) => {
    dispatch(toggleFavorite({ fontId: fontId, favorite: state }));
    sendFavorite(userId, fontId, state);
  };

  const sendFavorite = async (userId, fontId, state) => {
    try {
      const res = await axios.post(
        "/fonts/favorite",
        {
          userId,
          fontId,
          state,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );
      return res.status === 200;
    } catch (err) {
      console.error("FAILED : Try to handle favorite => ", err);
    }
  };

  const getFavorites = async (userId) => {
    try {
      const res = await axios.post(
        "/fonts/favorite/getAll",
        { userId },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );
      const data = res.data.data;
      data.forEach((favorite) => {
        dispatch(toggleFavorite({ fontId: favorite.fontId, favorite: true }));
      });
      console.log("getFavorites yeeeees");
      return res.status === 200;
    } catch (err) {
      console.error("FAILED : Try to get all favorites here =>, ", err);
    }
  };

  // DELETE FONTS____________________________________________________________________________
  const deleteFonts = async (fontId) => {
    try {
      dispatch(deleteFont(fontId));
      const res = await axios.post(
        "/fonts/delete",
        { fontId },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );
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
  }, []);

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
            onRatingChange={onRatingChange}
          />
        </div>
        <div className={s.card__box}>
          <div className={s.card__letter} style={{ fontFamily: font.name }}>
            <span
              className={
                small ? s.card__small__letter__letters : s.card__letter__letters
              }
            >
              Aa
            </span>
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
