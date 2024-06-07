import React from "react";
import s from "./Navbar.module.scss";
import Login from "../Login/Login";

export default function Navbar({ loginBtn, toggleLogin, toggleRegister }) {
  return (
    <>
      <nav className={s.navbar}>
        <div className={s.navbar__links}>
          <button type="button" className={s.navbar__links__link}>
            Contact
          </button>
          <button type="button" className={s.navbar__links__link}>
            EN
          </button>
          <div className={s.navbar__links__link}>
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
