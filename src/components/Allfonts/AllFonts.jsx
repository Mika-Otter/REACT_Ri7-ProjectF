import React, { useState, useEffect } from "react";
import s from "./AllFonts.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import useHandleFonts from "../../hooks/useHandleFonts";
import Sort from "../Sort/Sort";
import { useFonts } from "../../hooks/useFonts";

export default function AllFonts() {
  const dispatch = useDispatch();
  const fonts = useSelector((state) => state.fonts.value);
  const choosedFonts = useSelector((state) => state.choosedFonts.value);
  const userId = useSelector((state) => state.auth.userId);
  const [ratingChanged, setRatingChanged] = useState(false);

  const handleFonts = useHandleFonts(fonts, choosedFonts, dispatch);

  const { sortFonts, fontsRatings, sortedFonts, setSortedFonts } = useFonts(
    userId,
    ratingChanged
  );

  useEffect(() => {
    console.log(ratingChanged, "ratingChanged");
  }, [ratingChanged]);

  const onRatingChange = () => {
    setRatingChanged(true);
    setTimeout(() => setRatingChanged(false), 300);
  };

  return (
    <>
      <section className={s.allfonts}>
        <div className={s.container__title}>
          <div className={s.title}>
            <h3>All your fonts</h3>
            <Sort setSortedFonts={setSortedFonts} sortedFonts={sortedFonts} />
          </div>
        </div>
        <div className={s.content}>
          <div className={s.content__ctn}>
            {sortFonts(sortedFonts).map((font, i) => (
              <Card
                font={font}
                i={i}
                key={font.name + i}
                handleFonts={handleFonts}
                onRatingChange={onRatingChange}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
