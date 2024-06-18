import React, { useRef } from "react";
import s from "./Loader.module.scss";
import cn from "classnames";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Loader() {
  const tLetterRef = useRef(null);
  const yLetterRef = useRef(null);
  const pLetterRef = useRef(null);
  const pScdLetterRef = useRef(null);
  const circleRef = useRef(null);
  const vLetterRef = useRef(null);
  const containerRef = useRef(null);
  const loaderRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.set(tLetterRef.current, { opacity: 1, delay: 0.5 })
      .set(yLetterRef.current, { opacity: 1, delay: 0.5 }, ">")
      .set(pLetterRef.current, { opacity: 1, delay: 0.5 }, ">")
      .set(pScdLetterRef.current, { opacity: 1, delay: 0.5 }, ">")
      .set(vLetterRef.current, { opacity: 1, delay: 1 }, ">")
      .to(
        circleRef.current,
        { translateY: "0", duration: 0.3, ease: "power1.in" },
        ">"
      )
      .to(
        circleRef.current,
        { translateY: "-3%", duration: 0.2, ease: "power3.inOut" },
        ">"
      )
      .to(containerRef.current, { opacity: 0, duration: 0.3, delay: 1 })
      .to(loaderRef.current, { opacity: 0, duration: 0.3, delay: 0.3 })
      .to(loaderRef.current, { display: "none", duration: 0.1 });
  }, []);

  return (
    <section className={s.loader} ref={loaderRef}>
      <div className={s.loader__container} ref={containerRef}>
        <span className={cn(s.letter, s.letter__t)} ref={tLetterRef}>
          T
        </span>
        <span className={cn(s.letter, s.letter__y)} ref={yLetterRef}>
          Y
        </span>
        <span className={cn(s.letter, s.letter__p)} ref={pLetterRef}>
          P
        </span>
        <span className={cn(s.letter, s.letter__pScd)} ref={pScdLetterRef}>
          P
        </span>
        <div className={s.circle} ref={circleRef}></div>
        <span className={cn(s.letter, s.letter__V)} ref={vLetterRef}>
          V
        </span>
      </div>
    </section>
  );
}
