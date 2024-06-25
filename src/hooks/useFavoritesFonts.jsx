import { useDispatch, useSelector } from "react-redux";
import axios from "../app/api/axios";
import { useEffect } from "react";
import { toggleFavorite } from "../features/fontsSlice";

export const useFavoritesFonts = (userId) => {
  const dispatch = useDispatch();
  const csrfToken = useSelector((state) => state.csrf.csrfToken);

  const sendFavorite = async (fontId, state) => {
    try {
      const res = await axios.post(
        "/fonts/favorite",
        { userId, fontId, state },
        {
          headers: { "X-CSRF-Token": csrfToken },
          withCredentials: true,
        }
      );
      return res.status === 200;
    } catch (err) {
      console.error("FAILED : Try to handle favorite => ", err);
    }
  };

  const getFavorites = async () => {
    try {
      const res = await axios.post(
        "/fonts/favorite/getAll",
        { userId },
        {
          headers: { "X-CSRF-Token": csrfToken },
          withCredentials: true,
        }
      );
      const data = res.data.data;
      data.forEach((favorite) => {
        dispatch(toggleFavorite({ fontId: favorite.fontId, favorite: true }));
      });
      return res.status === 200;
    } catch (err) {
      console.error("FAILED : Try to get all favorites here =>, ", err);
    }
  };

  return { sendFavorite, getFavorites };
};
