import React, { useState, useEffect } from "react";
import s from "./AllFonts.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import useHandleFonts from "../../hooks/useHandleFonts";
import axios from "../../app/api/axios";
import cn from "classnames";

export default function AllFonts() {
  const dispatch = useDispatch();
  const fonts = useSelector((state) => state.fonts.value);
  const choosedFonts = useSelector((state) => state.choosedFonts.value);
  const userId = useSelector((state) => state.auth.userId);
  const [fontRatings, setFontRatings] = useState([]);
  const [sortedFonts, setSortedFonts] = useState("");

  const handleFonts = useHandleFonts(fonts, choosedFonts, dispatch);

  const getRate = async (userId) => {
    try {
      const res = await axios.post("/fonts/rate/getAll", { userId });
      const fontRates = res.data.data;
      setFontRatings(fontRates);
    } catch (err) {
      console.error("FAILED : Try to get all rates => ", err);
    }
  };

  const mergeRatingsWithFonts = (fonts, ratings) => {
    const ratingsMap = ratings.reduce((map, rate) => {
      map[rate.fontName] = rate.rating;
      return map;
    }, {});

    return fonts.map((font) => ({
      ...font,
      rating: ratingsMap[font.name] || 0,
    }));
  };

  const sortFonts = (sortedFonts) => {
    const mergedFonts = mergeRatingsWithFonts(fonts, fontRatings);
    console.log(mergedFonts, "mergedFonts");
    if (sortedFonts === "rate") {
      return mergedFonts.sort((a, b) => b.rating - a.rating);
    } else if (sortedFonts === "name") {
      return mergedFonts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortedFonts === "id") {
      return mergedFonts.sort((a, b) => b.id - a.id);
    }
    return mergedFonts;
  };

  useEffect(() => {
    if (userId) {
      getRate(userId);
    }
  }, [userId]);

  return (
    <>
      <section className={s.allfonts}>
        <div className={s.container__title}>
          <div className={s.title}>
            <h3>All your fonts</h3>
            <div className={s.sort}>
              <span>Sort by</span>

              <button
                type="button"
                className={cn(
                  s.sort__selector,
                  sortedFonts === "name" && s.active
                )}
                onClick={() => setSortedFonts("name")}
              >
                Name
              </button>
              <button
                type="button"
                className={cn(
                  s.sort__selector,
                  sortedFonts === "rate" && s.active
                )}
                onClick={() => setSortedFonts("rate")}
              >
                Rate
              </button>
              <button
                type="button"
                className={cn(
                  s.sort__selector,
                  sortedFonts === "id" && s.active
                )}
                onClick={() => setSortedFonts("id")}
              >
                Most Recent
              </button>
            </div>
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
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
