import axios from "../app/api/axios";
import { useDispatch, useSelector } from "react-redux";
import { setFonts } from "../features/fontsSlice";

const useFontUpload = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const csrfToken = useSelector((state) => state.csrf.csrfToken);

  const fontUpload = async (e) => {
    const fontList = e.target.files;
    const formData = new FormData();

    for (let i = 0; i < fontList.length; i++) {
      formData.append("files", fontList[i]);
      formData.append("fontNames", fontList[i].name);
    }

    formData.append("userId", userId);
    try {
      const res = await axios.post("/upload/addFont", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"), //send token from localStorage //CHANGE TO SESSION STORAGE ?
          "X-CSRF-Token": csrfToken,
        },
        withCredentials: true,
      });
      if (res.status === 200) {
        const newFonts = res.data.fonts;
        newFonts.forEach((font) => {
          dispatch(setFonts({ name: font.name, url: font.url, id: font.id }));
        });
      }
    } catch (err) {
      console.error("Failed to upload files :", err);
    }
  };

  return { fontUpload };
};

export default useFontUpload;
