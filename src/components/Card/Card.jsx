import React, { useState, useEffect } from "react";
import s from "./Card.module.scss";
import { useSelector } from "react-redux";
import FavoriteEmptySVG from "../SVG/FavoriteInactiveSVG";
import FavoriteAciveSVG from "../SVG/FavoriteActiveSVG";
import SettingsFont from "../SettingsFont/SettingsFont";
import { listSentences } from "./listSentencesData";
import { useHandleFonts } from "../../hooks/useHandleFonts";
import { useFavoritesFonts } from "../../hooks/useFavoritesFonts";
import { useRatingFonts } from "../../hooks/useRatingFonts";
import CardDetails from "./CardDetails";
import CardFavorite from "./CardFavorite";

export default function Card({ font, i, handleFonts, small, onRatingChange }) {
  const userId = useSelector((state) => state.auth.userId);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const { fonts, deleteFonts, selectFontAndNavigate } = useHandleFonts();
  const { getFavorites, handleFavorite } = useFavoritesFonts();
  const { ratings, handleRating, getRate } = useRatingFonts();

  const [text, setText] = useState("");
  useEffect(() => {
    setText(listSentences[Math.floor(Math.random() * listSentences.length)]);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getRate(userId);
      await getFavorites(userId);
      setFontsLoaded(true);
    };
    fetchData();
  }, []);

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
        <CardDetails
          font={font}
          text={text}
          selectFontAndNavigate={selectFontAndNavigate}
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
    </>
  );
}
