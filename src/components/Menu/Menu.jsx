import React, { useEffect, useState } from "react";
import s from "./Menu.module.scss";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoSVG from "../SVG/LogoSVG";
import Folder from "../Folder/Folder";
import Logout from "../Logout/Logout";
import MenuNav from "./MenuNav/MenuNav";
import ArrowRegisterBackSVG from "../SVG/ArrowRegisterBackSVG";

export default function Menu({ handleTransition }) {
  const username = useSelector((state) => state.auth.username);
  const [selector, setSelector] = useState("menu");
  const isMobile = useSelector((state) => state.isMobile.isMobile);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [listenerOpenMenu, setListenerOpenMenu] = useState(false);

  const handleIsOpenMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  useEffect(() => {
    if (isOpenMenu) {
      setListenerOpenMenu(false);
    } else {
      setListenerOpenMenu(true);
    }
  }, [isOpenMenu]);

  return (
    <>
      <div className={cn(s.menu, isOpenMenu && s.menu__active)}>
        {isMobile && (
          <button className={s.menu__close} onClick={() => handleIsOpenMenu()}>
            <ArrowRegisterBackSVG /> Close
          </button>
        )}

        <div className={s.menu__top}>
          <MenuNav
            setSelector={setSelector}
            selector={selector}
            handleIsOpenMenu={handleIsOpenMenu}
            listenerOpenMenu={listenerOpenMenu}
          />

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
