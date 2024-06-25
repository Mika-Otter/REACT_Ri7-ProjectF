import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserId, setUserName } from "../../features/authentificationSlice";
import s from "./Connect.module.scss";
import axios from "../../app/api/axios";
import { useCsrfToken } from "../../hooks/useCsrfToken";
import { setCsrfToken } from "../../features/tokenCsrfSlice";

export default function Connect({
  handleRegister,
  handleLogin,
  handleTransition,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
  const [err, setError] = useState(null);
  const [inputsConnect, setInputsConnect] = useState({
    email: "",
    password: "",
  });
  useCsrfToken();
  const csrfToken = useSelector((state) => state.csrf.csrfToken);

  function handleLogin(userData) {
    dispatch(setUserId(userData.id));
    dispatch(setUserName(userData.username));
  }

  function handleChange(e) {
    setInputsConnect((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/authentification/login", inputsConnect, {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        withCredentials: true,
      });
      setCsrfToken(res.data.csrfToken);
      localStorage.setItem("token", res.data.token);
      handleLogin(res.data);
      handleTransition();
      setTimeout(() => {
        navigate("/home");
      }, 500);
    } catch (err) {
      if (err.response) {
        setError(
          err.response.data.message ||
            "Shortest password is 6 characters or error occurred while processing your request."
        );
      } else if (err.request) {
        setError("Whoops... The server is not responding. Try again later.");
      } else {
        setError("An error occurred while processing your request.");
      }
    }
  }

  return (
    <>
      <div className={s.loginForm}>
        <form className={s.loginForm__form} onSubmit={handleSubmit}>
          <div className={s.loginForm__fields}>
            <div className={s.loginForm__email}>
              <label htmlFor="email">Email</label>

              <input
                type="email"
                autoComplete="on"
                name="email"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className={s.loginForm__password}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                autoComplete="off"
                name="password"
                onChange={(e) => handleChange(e)}
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
