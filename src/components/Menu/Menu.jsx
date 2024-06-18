import React, { useState } from "react";
import s from "./Menu.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoSVG from "../SVG/LogoSVG";
import Folder from "../Folder/Folder";
import Logout from "../Logout/Logout";

export default function Menu({ handleTransition }) {
  const username = useSelector((state) => state.auth.username);
  const [selector, setSelector] = useState("menu");
  return (
    <>
      <div className={s.menu}>
        <div className={s.menu__top}>
          <div className={s.menu__box__selector}>
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
        </div>
        <div className={s.menu__bottom}>
          <div className={s.menu__settings}>
            <Link to="/settings">Settings</Link>
            <Logout handleTransition={handleTransition} />
          </div>
          <div className={s.menu__box__logo}>
            <div className={s.menu__logo}>
              <LogoSVG />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
