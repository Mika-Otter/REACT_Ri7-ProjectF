import React from "react";
import s from "./RegisterNow.module.scss";
import ArrowRegisterSVG from "../SVG/ArrowRegisterSVG";

export default function RegisterNow() {
  return (
    <>
      <div className={s.registerNow}>
        <div className={s.registerNow__wrapper}>
          <span className={s.registerNow__wrapper__span}>Register now</span>
          <span className={s.registerNow__wrapper__span}>Register now</span>
        </div>

        <div className={s.registerNow__arrow}>
          <ArrowRegisterSVG />
        </div>
      </div>
    </>
  );
}
