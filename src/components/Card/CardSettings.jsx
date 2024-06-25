import React from "react";
import s from "./Card.module.scss";
import SettingsFont from "../SettingsFont/SettingsFont";

export default function CardSettings({
  font,
  userId,
  ratings,
  handleRating,
  deleteFonts,
  onRatingChange,
}) {
  <div className={s.card__settings}>
    <SettingsFont
      font={font}
      userId={userId}
      ratings={ratings}
      handleRating={handleRating}
      deleteFonts={deleteFonts}
      onRatingChange={onRatingChange}
    />
  </div>;
}
