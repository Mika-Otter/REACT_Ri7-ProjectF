import React, { useState } from "react";
import s from "./Favorites.module.scss";
import { useSelector, useDispatch } from "react-redux";

import Card from "../Card/Card";
import { useHandleSelectedFonts } from "../../hooks/useHandleSelectedFonts";
import Sort from "../Sort/Sort";
import { useSortedFonts } from "../../hooks/useSortedFonts";

export default function Favorites() {
  const dispatch = useDispatch();
  const fonts = useSelector((state) => state.fonts.value);
  const choosedFonts = useSelector((state) => state.choosedFonts.value);
  const userId = useSelector((state) => state.auth.userId);
  const [ratingChanged, setRatingChanged] = useState(false);

  const handleFonts = useHandleSelectedFonts(fonts, choosedFonts, dispatch);
  const { sortFonts, fontsRatings, sortedFonts, setSortedFonts } =
    useSortedFonts(userId, ratingChanged);

  const onRatingChange = () => {
    setRatingChanged(true);
    setTimeout(() => setRatingChanged(false), 300);
  };

  const hasFavoriteFonts = fonts.some((font) => font.favorite);

  return (
    <>
      <section className={s.favorites}>
        <div className={s.container__title}>
          <div className={s.title}>
            <h3>Your favorites typesfaces</h3>
            <Sort setSortedFonts={setSortedFonts} sortedFonts={sortedFonts} />
          </div>
        </div>
        <div className={s.favorites__box}>
          <div className={s.favorites__box__ctn}>
            {hasFavoriteFonts ? (
              sortFonts(sortedFonts).map((font, i) =>
                font.favorite ? (
                  <Card
                    font={font}
                    i={i}
                    key={font.name + i}
                    handleFonts={handleFonts}
                    onRatingChange={onRatingChange}
                  />
                ) : null
              )
            ) : (
              <div className={s.paragraph__section}>
                <p className={s.nochoosedfont}>
                  Add your favorite fonts by clicking on the heart of the chosen
                  font.
                </p>
                <p className={s.tips}>
                  TIPS! You can also rate your fonts by clicking on the
                  &rdquo;...&rdquo; button of the police card.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
