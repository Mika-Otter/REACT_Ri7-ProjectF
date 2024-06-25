import React from "react";
import s from "./Card.module.scss";
import FavoriteEmptySVG from "../SVG/FavoriteInactiveSVG";
import FavoriteActiveSVG from "../SVG/FavoriteActiveSVG";

export default function CardFavorite({ font, handleFavorite, userId }) {
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
      {font.favorite ? <FavoriteActiveSVG /> : <FavoriteEmptySVG />}
    </div>
  </div>;
}
