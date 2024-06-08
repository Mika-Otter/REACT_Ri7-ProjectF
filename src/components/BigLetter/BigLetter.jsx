import React, { useRef } from "react";
import s from "./BigLetter.module.scss";
import cn from "classnames";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function BigLetter() {
  const bigBoxRef = useRef(null);
  const circleBigRef = useRef(null);
  const circleMediumRef = useRef(null);
  const circleSmallRef = useRef(null);

  useGSAP(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercent = (clientX / innerWidth - 0.5) * 2 * -1;
      const yPercent = (clientY / innerHeight - 0.5) * 2 * -1;
      const depthBig = circleBigRef.current.dataset.depth || 0.5;
      const depthMedium = circleMediumRef.current.dataset.depth || 0.5;
      const depthSmall = circleSmallRef.current.dataset.depth || 0.5;
      const moveXBig = xPercent * depthBig * 50;
      const moveYBig = yPercent * depthBig * 50;
      const moveXMedium = xPercent * depthMedium * 50;
      const moveYMedium = yPercent * depthMedium * 50;
      const moveXSmall = xPercent * depthSmall * 50;
      const moveYSmall = yPercent * depthSmall * 50;

      gsap.to(circleBigRef.current, {
        x: moveXBig * 2,
        y: moveYBig * 2,
        duration: 0.5,
        ease: "power1.out",
      });
      gsap.to(circleMediumRef.current, {
        x: moveXMedium * -1,
        y: moveYMedium,
        duration: 0.5,
        ease: "power1.out",
      });
      gsap.to(circleSmallRef.current, {
        x: moveXSmall,
        y: moveYSmall * -1,
        duration: 0.5,
        ease: "power1.out",
      });
    };

    bigBoxRef.current.addEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div className={s.bigbox__font} ref={bigBoxRef}>
        <div className={cn("circle", s.circle__big)} ref={circleBigRef}></div>
        <div
          className={cn("circle", s.circle__medium)}
          ref={circleMediumRef}
        ></div>
        <div
          className={cn("circle", s.circle__small)}
          ref={circleSmallRef}
        ></div>
        <div className={s.box__left}>
          <div className={cn(s.font, s.font__left, s.font__left__first)}>
            <span>ont</span>
          </div>
          <div className={cn(s.font, s.font__left, s.font__left__second)}>
            <span>on</span>
          </div>
          <div className={cn(s.font, s.font__left, s.font__left__third)}>
            <span>o</span>
            <div className={s.font__left__third__text}>
              <h3>Build for work</h3>
              <p>
                Rate, classify, share, try, and download. Gain an ergonomic view
                of the fonts you prefer to work with. Add keywords for swift
                retrieval. Download your chosen fonts quickly from any device.
              </p>
            </div>
          </div>
        </div>
        <div className={s.box__right}>
          <div className={cn(s.font, s.font__right, s.font__right__first)}>
            <div className={s.font__right__first__text}>
              <h3>All your types in</h3>
              <h3>one place.</h3>
              <h3>Everywhere !</h3>
              <p>
                Rate, classify, share, try, and download. Gain an ergonomic view
                of the fonts you prefer to work with. Add keywords for swift
                retrieval. Download your chosen fonts quickly from any device.
              </p>
            </div>
            <span>n</span>
          </div>
          <div className={cn(s.font, s.font__right, s.font__right__second)}>
            <span>on</span>
          </div>
          <div className={cn(s.font, s.font__right, s.font__right__third)}>
            <span>Fon</span>
          </div>
        </div>
      </div>
    </>
  );
}
