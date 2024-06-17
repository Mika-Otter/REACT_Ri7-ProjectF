import React, { useEffect } from "react";
import s from "./Sort.module.scss";
import cn from "classnames";

export default function Sort({ setSortedFonts, sortedFonts }) {
  useEffect(() => {
    console.log("sortedFonts", sortedFonts);
  }, [sortedFonts]);
  return (
    <>
      <div className={s.sort}>
        <span className={s.sort__span}>Sort by</span>

        <button
          type="button"
          className={cn(s.sort__selector, sortedFonts === "name" && s.active)}
          onClick={() => {
            sortedFonts === "name"
              ? setSortedFonts("")
              : setSortedFonts("name");
          }}
        >
          Name
        </button>
        <button
          type="button"
          className={cn(s.sort__selector, sortedFonts === "rate" && s.active)}
          onClick={() => {
            sortedFonts === "rate"
              ? setSortedFonts("")
              : setSortedFonts("rate");
          }}
        >
          Rate
        </button>
        <button
          type="button"
          className={cn(s.sort__selector, sortedFonts === "id" && s.active)}
          onClick={() => {
            sortedFonts === "id" ? setSortedFonts("") : setSortedFonts("id");
          }}
        >
          Most Recent
        </button>
      </div>
    </>
  );
}
