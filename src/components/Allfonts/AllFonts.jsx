import React, { useState, useEffect } from "react";
import s from "./AllFonts.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import { useHandleSelectedFonts } from "../../hooks/useHandleSelectedFonts";
import Sort from "../Sort/Sort";
import { useSortedFonts } from "../../hooks/useSortedFonts";

export default function AllFonts() {
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
    setTimeout(() => setRatingChanged(false), 70);
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
            {fonts.length === 0 ? (
              <>
                <div className={s.paragraph__section}>
                  <p className={s.nochoosedfont}>
                    Welcome font lover, start by going to your folder to add
                    your first fonts...{" "}
                  </p>
                  <p className={s.tips}>
                    TIPS ! You can add several fonts at once.{" "}
                  </p>
                </div>
              </>
            ) : (
              sortFonts(sortedFonts).map((font, i) => (
                <Card
                  font={font}
                  i={i}
                  key={font.name + i}
                  handleFonts={handleFonts}
                  onRatingChange={onRatingChange}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
