import { useDispatch, useSelector } from "react-redux";
import axios from "../app/api/axios";
import { toggleFavorite } from "../features/fontsSlice";

export const useFavoritesFonts = () => {
  const dispatch = useDispatch();
  const csrfToken = useSelector((state) => state.csrf.csrfToken);

  const sendFavorite = async (userId, fontId, state) => {
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

  const handleFavorite = (userId, fontId, state) => {
    dispatch(toggleFavorite({ fontId: fontId, favorite: state }));
    sendFavorite(userId, fontId, state);
  };

  const getFavorites = async (userId) => {
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

  return { getFavorites, handleFavorite };
};
