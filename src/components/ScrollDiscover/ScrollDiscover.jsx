import React from "react";
import s from "./ScrollDiscover.module.scss";

export default function ScrollDiscover() {
  return (
    <>
      <div className={s.scrollDiscover}>
        <div className={s.scrollDiscover__circle}></div>
        <span>Scroll for discover more</span>
      </div>
    </>
  );
}
