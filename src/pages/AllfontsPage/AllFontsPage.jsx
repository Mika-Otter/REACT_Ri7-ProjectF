import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFonts } from "../../features/fontsSlice";
import AllFonts from "../../components/Allfonts/AllFonts";
import axios from "../../app/api/axios";
import useCsrfToken from "../../hooks/useCsrfToken";

export default function AllFontsPage() {
  const dispatch = useDispatch();
  const fonts = useSelector((state) => state.fonts.value);
  const userId = useSelector((state) => state.auth.userId);

  const csrfToken = useCsrfToken();

  const getUserFonts = async () => {
    try {
      const res = await axios.post(
        "/fonts/getAll",
        { userId },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        const fontsData = res.data.fonts;
        fontsData.forEach((font) => {
          if (!fonts.some((existingFont) => existingFont.name === font.name)) {
            dispatch(
              setFonts({
                name: font.name,
                url: font.url,
                id: font.id,
              })
            );
          }
        });
      } else {
        console.error("Failed to fetch user fonts: ", res.statusText);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserFonts(); //First rendering get all user's fonts
  }, []);

  return (
    <>
      <section>
        <AllFonts />
      </section>
    </>
  );
}
