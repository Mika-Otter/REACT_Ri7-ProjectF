import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWindowWidth, setIsMobile } from "../../features/isMobileSlice";

export default function ScreenListener() {
  const dispatch = useDispatch();
  const windowWidth = useSelector((state) => state.isMobile.windowWidth);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      dispatch(setWindowWidth(newWidth));
      if (newWidth > 900) {
        dispatch(setIsMobile(false));
      } else {
        window.location.reload();
        dispatch(setIsMobile(true));
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return null;
}
