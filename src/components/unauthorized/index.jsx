import React from "react";
import s from "./unauthorized.module.scss";
import LogoSVG from "../SVG/LogoSVG";
import ArrowRegisterBackSVG from "../SVG/ArrowRegisterBackSVG";

export default function Unauthorized() {
  return (
    <>
      <section className={s.unauthorized}>
        <h1 className={s.unauthorized__title}>Whoops...</h1>
        <p className={s.unauthorized__text}>
          There was an error with your request. Please, back to home and log in.
        </p>
        <a href="/" className={s.unauthorized__text__link}>
          <div className={s.unauthorized__text__link__arrow}>
            <ArrowRegisterBackSVG />
          </div>
          Back to{" "}
          <div className={s.unauthorized__text__link__logo}>
            <LogoSVG />
          </div>
        </a>
        <div className={s.unauthorized__404}>
          {[...Array(10)].map((_, index) => (
            <span key={index} className={s.unauthorized__404__span}>
              404
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
