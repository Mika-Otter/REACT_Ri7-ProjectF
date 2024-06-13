import React, { useState, useEffect } from "react";
import s from "./AllFonts.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../features/fontsSlice";
import axios from "../../app/api/axios";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import useHandleFonts from "../../hooks/useHandleFonts";

export default function AllFonts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.username);
  const fonts = useSelector((state) => state.fonts.value);
  const choosedFonts = useSelector((state) => state.choosedFonts.value);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const userId = useSelector((state) => state.auth.userId);

  const [ratings, setRatings] = useState({});

  // _HANDLE RATE FAVORITE ______________________________________________________________________________
  const handleRating = (userId, fontId, fontName, rating) => {
    setRatings((prev) => ({
      ...prev,
      [fontName]: rating,
    }));
    sendRate(userId, fontId, rating);
  };

  const sendRate = async (userId, fontId, rating) => {
    try {
      const res = await axios.post("/fonts/rate", { userId, fontId, rating });
      return res.status === 200;
    } catch (err) {
      console.error("FAILED : Try to rate typeface => ", err);
    }
  };

  const getRate = async (userId) => {
    try {
      const res = await axios.post("/fonts/rate/getAll", { userId });
      const fontRates = res.data.data;
      fontRates.forEach((rate) => {
        setRatings((prev) => ({
          ...prev,
          [rate.fontName]: rate.rating,
        }));
      });
    } catch (err) {
      console.error("FAILED : Try to get all rates => ", err);
    }
  };

  // _HANDLE FAVORITE ______________________________________________________________________________
  const handleFavorite = (userId, fontId, state) => {
    dispatch(toggleFavorite({ fontId: fontId, favorite: state }));
    sendFavorite(userId, fontId, state);
  };

  const sendFavorite = async (userId, fontId, state) => {
    try {
      const res = await axios.post("/fonts/favorite", {
        userId,
        fontId,
        state,
      });
      return res.status === 200;
    } catch (err) {
      console.error("FAILED : Try to handle favorite => ", err);
    }
  };

  const getFavorites = async (userId) => {
    try {
      const res = await axios.post("/fonts/favorite/getAll", { userId });
      const data = res.data.data;
      data.forEach((favorite) => {
        dispatch(toggleFavorite({ fontId: favorite.fontId, favorite: true }));
      });
      return res.status === 200;
    } catch (err) {
      console.error("FAILED : Try to get all favorites =>, ", err);
    }
  };

  const handleFonts = useHandleFonts(fonts, choosedFonts, dispatch);

  // OTHERS__________________________________________________________________________________

  useEffect(() => {
    const fetchData = async () => {
      await getRate(userId);
      await getFavorites(userId);
      setFontsLoaded(true);
    };
    fetchData();
  }, [userId]);

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
      <section className={s.allfonts}>
        <div className={s.container__title}>
          <div className={s.title}>
            <h3>All your fonts</h3>
            <div className={s.title__paramas}>
              <span>Sort by</span>
              <span className={s.title__paramas__selector}>Rate</span>
            </div>
          </div>
        </div>
        <div className={s.content}>
          <div className={s.content__ctn}>
            {fonts.map((font, i) => (
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
