import React, { useState } from "react";
import s from "./Connect.module.scss";
import { useCsrfToken } from "../../hooks/useCsrfToken";
import { useLogin } from "../../hooks/useLogin";

export default function Connect({
  handleRegister,
  handleLogin,
  handleTransition,
}) {
  const [err, setError] = useState(null);
  useCsrfToken();

  const { handleChangeInputs, handleSubmitLogin } = useLogin({
    setError,
    handleTransition,
  });

  return (
    <>
      <div className={s.loginForm}>
        <form className={s.loginForm__form} onSubmit={handleSubmitLogin}>
          <div className={s.loginForm__fields}>
            <div className={s.loginForm__email}>
              <label htmlFor="email">Email</label>

              <input
                type="email"
                autoComplete="on"
                name="email"
                onChange={(e) => handleChangeInputs(e)}
                required
              />
            </div>
            <div className={s.loginForm__password}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                autoComplete="off"
                name="password"
                onChange={(e) => handleChangeInputs(e)}
                required
              />
            </div>
          </div>

          <button type="submit" className={s.loginForm__btn}>
            <span>Login</span>
          </button>
          {err && <p className={s.error}>{err}</p>}
          <div className={s.register}>
            <span>Don&rsquo;t you have an account ? </span>{" "}
            <a
              onClick={() => {
                handleRegister();
              }}
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
