import React, { useState } from "react";
import s from "./menu.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoSVG from "../SVG/LogoSVG";
import Folder from "../folder/folder";

export default function Menu() {
  const username = useSelector((state) => state.auth.username);
  const [selector, setSelector] = useState("menu");
  return (
    <>
      <div className={s.menu}>
        <div className={s.menu__selector}>
          <button
            type="button"
            className={
              selector === "menu"
                ? s.menu__selector__menu
                : s.menu__selector__button
            }
            onClick={() => setSelector("menu")}
          >
            Menu
          </button>
          <button
            type="button"
            className={
              selector === "folder"
                ? s.menu__selector__folder
                : s.menu__selector__button
            }
            onClick={() => setSelector("folder")}
          >
            Folder
          </button>
        </div>

        <div className={s.menu__box}>
          {selector === "folder" ? (
            <Folder />
          ) : (
            <div className={s.menu__menu}>
              <Link to="/home">All your fonts</Link>
              <Link to="/favorites">Your favorites types</Link>
              <Link to="/variable">Variable text</Link>
              <Link to="/fonttest">Test fonts</Link>
            </div>
          )}
        </div>
        <div className={s.menu__settings}>
          <Link to="/settings">Settings</Link>
          <button type="button">Logout</button>
        </div>
        <div className={s.menu__box__logo}>
          <div className={s.menu__logo}>
            <LogoSVG />
          </div>
        </div>
      </div>
    </>
  );
}
