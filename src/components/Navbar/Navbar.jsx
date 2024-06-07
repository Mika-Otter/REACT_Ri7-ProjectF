import React from "react";
import s from "./Navbar.module.scss";
import Login from "../Login/Login";
import cn from "classnames";

export default function Navbar({ loginBtn, toggleLogin, toggleRegister }) {
  return (
    <>
      <nav className={s.navbar}>
        <div className={s.navbar__links}>
          <button
            type="button"
            className={cn(
              s.navbar__links__link,
              s.navbar__links__link__contact
            )}
          >
            Contact
          </button>
          <button type="button" className={s.navbar__links__link}>
            EN
          </button>
          <div
            className={cn(s.navbar__links__link, s.navbar__links__link__button)}
          >
            <Login
              active={loginBtn}
              toggleLogin={toggleLogin}
              toggleRegister={toggleRegister}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
