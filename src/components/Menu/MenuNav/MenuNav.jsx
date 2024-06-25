import React from "react";
import s from "./MenuNav.module.scss";

export default function MenuNav({
  setSelector,
  selector,
  handleIsOpenMenu,
  listenerOpenMenu,
}) {
  return (
    <>
      <div className={s.menuNav}>
        <div className={s.menuNav__selector}>
          <button
            type="button"
            className={
              selector === "menu"
                ? s.menuNav__selector__menu
                : s.menuNav__selector__button
            }
            onClick={() => {
              setSelector("menu");
              if (selector === "menu" || listenerOpenMenu) handleIsOpenMenu();
            }}
          >
            Menu
          </button>
          <button
            type="button"
            className={
              selector === "folder"
                ? s.menuNav__selector__folder
                : s.menuNav__selector__button
            }
            onClick={() => {
              setSelector("folder");
              if (selector === "folder" || listenerOpenMenu) handleIsOpenMenu();
            }}
          >
            Folder
          </button>
        </div>
      </div>
    </>
  );
}
