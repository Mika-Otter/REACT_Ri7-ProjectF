import React from "react";
import s from "./Card.module.scss";

export default function CardDetails({
  font,
  text,
  gotoVariable,
  gotoTest,
  small,
}) {
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
  </div>;
}
