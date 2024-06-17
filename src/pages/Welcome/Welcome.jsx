import React, { useEffect, useRef, useState } from "react";
import s from "./Welcome.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "../../components/Navbar/Navbar";
import LogoSVG from "../../components/SVG/LogoSVG";
import BigLetter from "../../components/BigLetter/BigLetter";
import ScrollDiscover from "../../components/ScrollDiscover/ScrollDiscover";
import RegisterNow from "../../components/RegisterNow/RegisterNow";
import NewRegister from "../../components/NewRegister/NewRegister";

// , { useEffect, useState, useRef }

export default function Welcome({ handleTransition }) {
  const [loginBtn, setLoginBtn] = useState(false);
  const [register, setRegister] = useState(false);

  const [isLogin, setIsLogin] = useState(false);
  const [isAnimationLogin, setIsAnimationLogin] = useState(false);
  const bigboxContent = useRef();

  const handleLogin = () => {
    if (isLogin) {
      setIsAnimationLogin(false);
    } else {
      setIsAnimationLogin(true); // opens immediately
    }
  };

  const handleRegister = () => {
    handleTransition();
    setTimeout(() => {
      setRegister(!register);
    }, 500);
  };

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
          handleRegister={handleRegister}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleLogin={handleLogin}
          isAnimationLogin={isAnimationLogin}
          handleTransition={handleTransition}
        />
        <BigLetter />
        <ScrollDiscover />
        <RegisterNow handleRegister={handleRegister} />
        {register && (
          <NewRegister
            register={register}
            handleRegister={handleRegister}
            setLoginBtn={setLoginBtn}
          />
        )}
      </section>
    </>
  );
}
