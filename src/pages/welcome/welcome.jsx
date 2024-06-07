import React, { useEffect, useRef, useState } from "react";
import s from "./Welcome.module.scss";

import Login from "../../components/Login/Login";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Register from "../../components/Register/Register";
import Navbar from "../../components/Navbar/Navbar";

// , { useEffect, useState, useRef }

export default function Welcome() {
  const [loginBtn, setLoginBtn] = useState(false);
  const [register, setRegister] = useState(false);
  const bigboxContent = useRef();

  const toggleLogin = () => {
    setLoginBtn(!loginBtn);
  };

  const toggleRegister = () => {
    setRegister(!register);
  };

  useEffect(() => {
    console.log(window.innerHeight, window.innerWidth);
  });

  useGSAP(() => {
    const up = () =>
      gsap.to(bigboxContent.current, {
        top: -800,
        opacity: 0,
        duration: 0.5,
      });
    const down = () =>
      gsap.to(bigboxContent.current, { top: 0, opacity: 1, duration: 1 });
    register ? up() : down();
  }, [register]);

  return (
    <>
      <section>
        <Navbar
          active={loginBtn}
          toggleLogin={toggleLogin}
          toggleRegister={toggleRegister}
        />
        <div className={s.bigbox__navbar} ref={bigboxContent}>
          <div className={s.content}>
            <div className={s.getstarted}>
              <div className={s.getstarted__title}>
                <h2>All your favorites</h2>
                <h2>typographies in</h2>
                <h2>one place</h2>
              </div>
              <button type="button" onClick={() => toggleRegister()}>
                Get started
                <div id={s.wrapper__arrow}>
                  <img
                    src="/assets/welcome-img/arrow-started.png"
                    alt="arrow"
                    id={s.arrow}
                  />
                </div>
              </button>
              <p>
                This project is born for my diploma in Ri7 School. <br /> A
                place for upload, rate, find, set and try many fonts.
              </p>
              <span>
                A ㅅЖㅍ C ﺏDㅟ EЙ F G예 Hは I J Kﺙ УL 우むM ﺽNびЦﻕㅟO み...{" "}
              </span>
            </div>
            <aside className={s.pictures}>
              <div className={s.pictures__variabletext}>
                <img
                  src="/assets/welcome-img/variabletex2.png"
                  alt="variabletext"
                  className={s.pictures__variabletext__pic}
                />
              </div>
              <div className={s.pictures__tweens}>
                <img
                  src="/assets/welcome-img/favorites.png"
                  alt="favorites"
                  className={s.pictures__tweens__favorites}
                />
                <img
                  src="/assets/welcome-img/folder2.png"
                  alt="folder"
                  className={s.pictures__tweens__folder}
                />
              </div>
            </aside>
          </div>
        </div>
        <div className={s.register}>
          <Register
            register={register}
            toggleRegister={toggleRegister}
            setLoginBtn={setLoginBtn}
          />
        </div>
      </section>
    </>
  );
}
