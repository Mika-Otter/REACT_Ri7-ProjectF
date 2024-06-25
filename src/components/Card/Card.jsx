import React, { useState, useEffect } from "react";
import s from "./Card.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRatingFonts } from "../../hooks/useRatingFonts";
import { useFavoritesFonts } from "../../hooks/useFavoritesFonts";
import { useHandleFonts } from "../../hooks/useHandleFonts";
import { CardDetails } from "./CardDetails";
import { CardSettings } from "./CardSettings";
import { CardFavorite } from "./CardFavorite";
import { listSentences } from "./listSentencesData";
import { toggleFavorite } from "../../features/fontsSlice";

export default function Card({ font, i, handleFonts, small, onRatingChange }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const { ratings, sendRate } = useRatingFonts(userId);
  const { sendFavorite } = useFavoritesFonts(userId);
  const { fonts, fontsLoaded, deleteFonts, selectFontAndNavigate } =
    useHandleFonts();

  const [text, setText] = useState("");

  const handleRating = (userId, fontId, fontName, rating) => {
    sendRate(fontId, rating);
  };

  const handleFavorite = (userId, fontId, state) => {
    dispatch(toggleFavorite({ fontId, favorite: state }));
    sendFavorite(fontId, state);
  };

  useEffect(() => {
    setText(listSentences[Math.floor(Math.random() * listSentences.length)]);
  }, []);

  if (!fontsLoaded) {
    return <div className={s.loading}></div>;
  }

  return (
    <div
      className={small ? s.card__small : s.card}
      key={font.name + i}
      onClick={() => handleFonts(font.name)}
    >
      <CardSettings
        font={font}
        userId={userId}
        ratings={ratings}
        handleRating={handleRating}
        deleteFonts={deleteFonts}
        onRatingChange={onRatingChange}
      />
      <CardDetails
        font={font}
        text={text}
        gotoVariable={(fontId) => selectFontAndNavigate(fontId, "/variable")}
        gotoTest={(fontId) => selectFontAndNavigate(fontId, "/fonttest")}
        small={small}
      />
      {!small && (
        <CardFavorite
          font={font}
          handleFavorite={handleFavorite}
          userId={userId}
        />
      )}
    </div>
  );
}
