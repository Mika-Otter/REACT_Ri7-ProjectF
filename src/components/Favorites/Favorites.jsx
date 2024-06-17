import React, { useState, useEffect } from "react";
import s from "./Favorites.module.scss";
import { useSelector, useDispatch } from "react-redux";

import Card from "../Card/Card";
import useHandleFonts from "../../hooks/useHandleFonts";
import Sort from "../Sort/Sort";
import { useFonts } from "../../hooks/useFonts";

export default function Favorites() {
  const dispatch = useDispatch();
  const fonts = useSelector((state) => state.fonts.value);
  const choosedFonts = useSelector((state) => state.choosedFonts.value);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const userId = useSelector((state) => state.auth.userId);

  const handleFonts = useHandleFonts(fonts, choosedFonts, dispatch);
  const { sortedFonts, setSortedFonts, sortFonts } = useFonts(userId);

  // OTHERS__________________________________________________________________________________

  useEffect(() => {
    if (fonts.length > 0) {
      setFontsLoaded(true);
    }
  }, [fonts]);

  if (!fontsLoaded) {
    return <div>Loading...</div>;
  }

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
                />
              ) : null
            )}
          </div>
        </div>
      </section>
    </>
  );
}
