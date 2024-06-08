import React, { useEffect, useRef } from "react";
import s from "./Login.module.scss";

export default function Login({ handleLogin }) {
  const buttonRef = useRef();

  return (
    <>
      <div className={s.login} ref={buttonRef}>
        <button
          type="button"
          onClick={() => handleLogin()}
          className={s.login__btn}
        >
          Sign in
        </button>
      </div>
    </>
  );
}
