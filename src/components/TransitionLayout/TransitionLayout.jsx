import React, { useRef } from "react";
import s from "./TransitionLayout.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function TransitionLayout({ isTransition }) {
  const transitionRef = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.set(transitionRef.current, { zIndex: 30000 })
      .to(transitionRef.current, {
        opacity: 1,
        duration: 0.4,
      })
      .to(
        transitionRef.current,
        {
          opacity: 0,
          delay: 0.3,
          duration: 0.3,
        },
        ">"
      )
      .set(transitionRef.current, { zIndex: -2 }, ">");
  }, [isTransition]);

  return (
    <>
      <div className={s.transitionLayout} ref={transitionRef}></div>
    </>
  );
}
