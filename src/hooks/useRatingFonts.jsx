import { useState, useEffect } from "react";
import axios from "../app/api/axios";
import { useSelector } from "react-redux";

export const useRatingFonts = () => {
  const [ratings, setRatings] = useState({});
  const csrfToken = useSelector((state) => state.csrf.csrfToken);

  const sendRate = async (userId, fontId, rating) => {
    try {
      const res = await axios.post(
        "/fonts/rate",
        { userId, fontId, rating },
        {
          headers: { "X-CSRF-Token": csrfToken },
          withCredentials: true,
        }
      );
      return res.status === 200;
    } catch (err) {
      console.error("FAILED : Try to rate typeface => ", err);
    }
  };

  const handleRating = (userId, fontId, fontName, rating) => {
    setRatings((prev) => ({
      ...prev,
      [fontName]: rating,
    }));
    sendRate(userId, fontId, rating);
  };

  const getRate = async (userId) => {
    try {
      const res = await axios.post(
        "/fonts/rate/getAll",
        { userId },
        {
          headers: { "X-CSRF-Token": csrfToken },
          withCredentials: true,
        }
      );
      const fontRates = res.data.data;
      fontRates.forEach((rate) => {
        setRatings((prev) => ({
          ...prev,
          [rate.fontName]: rate.rating,
        }));
      });
    } catch (err) {
      console.error("FAILED : Try to get all rates Card => ", err);
    }
  };

  return { ratings, handleRating, getRate };
};
