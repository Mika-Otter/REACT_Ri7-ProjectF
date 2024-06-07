import React from "react";
import s from "./BigLetter.module.scss";
import cn from "classnames";

export default function BigLetter() {
  return (
    <>
      <div className={s.bigbox__font}>
        <div className={s.circle__big}></div>
        <div className={s.circle__medium}></div>
        <div className={s.circle__small}></div>
        <div className={s.box__left}>
          <div className={cn(s.font, s.font__left, s.font__left__first)}>
            <span>ont</span>
          </div>
          <div className={cn(s.font, s.font__left, s.font__left__second)}>
            <span>on</span>
          </div>
          <div className={cn(s.font, s.font__left, s.font__left__third)}>
            <span>o</span>
            <div className={s.font__left__third__text}>
              <h3>Build for work</h3>
              <p>
                Rate, classify, share, try, and download. Gain an ergonomic view
                of the fonts you prefer to work with. Add keywords for swift
                retrieval. Download your chosen fonts quickly from any device.
              </p>
            </div>
          </div>
        </div>
        <div className={s.box__right}>
          <div className={cn(s.font, s.font__right, s.font__right__first)}>
            <div className={s.font__right__first__text}>
              <h3>All your types in</h3>
              <h3>one place.</h3>
              <h3>Everywhere !</h3>
              <p>
                Rate, classify, share, try, and download. Gain an ergonomic view
                of the fonts you prefer to work with. Add keywords for swift
                retrieval. Download your chosen fonts quickly from any device.
              </p>
            </div>
            <span>n</span>
          </div>
          <div className={cn(s.font, s.font__right, s.font__right__second)}>
            <span>on</span>
          </div>
          <div className={cn(s.font, s.font__right, s.font__right__third)}>
            <span>Fon</span>
          </div>
        </div>
      </div>
    </>
  );
}
