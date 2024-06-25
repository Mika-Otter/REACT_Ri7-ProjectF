import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../app/api/axios";

export const useSortedFonts = (userId, ratingChanged) => {
  const fonts = useSelector((state) => state.fonts.value);
  const [fontRatings, setFontRatings] = useState([]);
  const [sortedFonts, setSortedFonts] = useState("");
  const csrfToken = useSelector((state) => state.csrf.csrfToken);

  const getRate = async (userId) => {
    try {
      const res = await axios.post(
        "/fonts/rate/getAll",
        {
          userId: userId,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );
      const fontRates = res.data.data;
      setFontRatings(fontRates);
    } catch (err) {
      console.error("FAILED : Try to get all rates UseSortedFonts => ", err);
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
      const fetchData = async () => {
        await getRate(userId);
      };
      fetchData();
    }
  }, [userId, ratingChanged]);

  return { sortFonts, fontRatings, sortedFonts, setSortedFonts };
};
