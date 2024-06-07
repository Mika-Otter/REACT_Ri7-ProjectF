import React, { useEffect, useRef, useState } from "react";
import s from "./Welcome.module.scss";
import cn from "classnames";

import Login from "../../components/Login/Login";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Register from "../../components/Register/Register";
import Navbar from "../../components/Navbar/Navbar";
import LogoSVG from "../../components/SVG/LogoSVG";
import BigLetter from "../../components/BigLetter/BigLetter";
import ScrollDiscover from "../../components/ScrollDiscover/ScrollDiscover";
import RegisterNow from "../../components/RegisterNow/RegisterNow";

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
      <div className={s.fade}></div>
      <section className={s.welcome}>
        <div className={s.logo}>
          <LogoSVG />
        </div>
        <Navbar
          active={loginBtn}
          toggleLogin={toggleLogin}
          toggleRegister={toggleRegister}
        />
        <BigLetter />
        <ScrollDiscover />
        <RegisterNow />
      </section>
    </>
  );
}
