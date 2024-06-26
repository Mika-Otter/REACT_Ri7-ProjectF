import { useEffect } from "react";

export const useResizeScreen = (setWindowWidth, setIsMobile) => {
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth > 900) {
        setWindowWidth(newWidth);
        setIsMobile(true);
        // window.location.reload();
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWindowWidth, setIsMobile]);
};
