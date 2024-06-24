import React, { useState, useEffect } from "react";
import s from "./Favorites.module.scss";
import { useSelector, useDispatch } from "react-redux";

import Card from "../Card/Card";
import useHandleFonts from "../../hooks/useHandleSelectedFonts";
import Sort from "../Sort/Sort";
import { useSortedFonts } from "../../hooks/useSortedFonts";

export default function Favorites() {
  const dispatch = useDispatch();
  const fonts = useSelector((state) => state.fonts.value);
  const choosedFonts = useSelector((state) => state.choosedFonts.value);
  const userId = useSelector((state) => state.auth.userId);
  const [ratingChanged, setRatingChanged] = useState(false);

  const handleFonts = useHandleFonts(fonts, choosedFonts, dispatch);
  const { sortFonts, fontsRatings, sortedFonts, setSortedFonts } =
    useSortedFonts(userId, ratingChanged);

  useEffect(() => {
    console.log(ratingChanged, "ratingChanged");
  }, [ratingChanged]);

  const onRatingChange = () => {
    setRatingChanged(true);
    setTimeout(() => setRatingChanged(false), 300);
  };

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
            {sortFonts(sortedFonts).map((font, i) =>
              font.favorite ? (
                <Card
                  font={font}
                  i={i}
                  key={font.name + i}
                  handleFonts={handleFonts}
                  onRatingChange={onRatingChange}
                />
              ) : null
            )}
          </div>
        </div>
      </section>
    </>
  );
}
