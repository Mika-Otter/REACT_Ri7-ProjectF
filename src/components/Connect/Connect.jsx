import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserId, setUserName } from "../../features/authSlice";

import s from "./Connect.module.scss";
import axios from "axios";

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
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    async function fetchCsrfToken() {
      const response = await axios.get("http://localhost:8080/getCSRFToken", {
        withCredentials: true,
      });
      setCsrfToken(response.data.csrfToken);
    }
    fetchCsrfToken();
  }, []);

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
      const res = await axios.post(
        "http://localhost:8080/server/auth/login",
        inputsConnect,
        {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );
      localStorage.setItem("token", res.data.token);
      handleLogin(res.data);
      handleTransition();
      setTimeout(() => {
        navigate("/home");
      }, 500);
    } catch (err) {
      if (err.response) {
        // Errors from the server
        setError(err.response.data.message || "An error occurred.");
      } else if (err.request) {
        // Errors from the request
        setError("Whoops... The server is not responding. Try again later.");
      } else {
        // Other errors
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
