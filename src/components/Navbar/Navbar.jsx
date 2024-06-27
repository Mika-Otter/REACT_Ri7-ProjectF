import React, { useEffect, useRef } from "react";
import s from "./Navbar.module.scss";
import Login from "../Login/Login";
import cn from "classnames";
import Connect from "../Connect/Connect";

import gsap from "gsap";

export default function Navbar({
  handleRegister,
  isLogin,
  setIsLogin,
  handleLogin,
  isAnimationLogin,
  handleTransition,
}) {
  const connectRef = useRef(null);

  useEffect(() => {
    if (isAnimationLogin) {
      setIsLogin(true);
      gsap.to(connectRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.15,
        ease: "power1.out",
      });
    } else {
      gsap.to(connectRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.15,
        ease: "power1.out",
      });
      setTimeout(() => {
        setIsLogin(false);
      }, 150); // delay of 300ms when closing the component
    }
  }, [isAnimationLogin]);

  return (
    <>
      <section className={s.bigbox}>
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
              className={cn(
                s.navbar__links__link,
                s.navbar__links__link__button
              )}
            >
              <Login handleLogin={handleLogin} />
            </div>
          </div>
        </nav>
        <div className={s.connect} ref={connectRef}>
          {isLogin === true ? (
            <Connect
              handleRegister={handleRegister}
              handleTransition={handleTransition}
            />
          ) : null}
        </div>
      </section>
    </>
  );
}
