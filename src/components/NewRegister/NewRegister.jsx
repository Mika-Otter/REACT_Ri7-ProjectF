import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./NewRegister.module.scss";
import axios from "../../app/api/axios";
import ArrowRegisterBackSVG from "../SVG/ArrowRegisterBackSVG";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import LogoSVG from "../SVG/LogoSVG";

const USER_REGEX = /^[A-Za-z][A-Za-z0-9-]{3,22}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@?$%]).{6,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGISTER_URL = "http://localhost:8080/authentification/register";

export default function NewRegister({ handleRegister, setLoginBtn }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const [errorMessage, setErrorMessage] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const [success, setSuccess] = useState("");

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

  const onSubmit = async (data) => {
    try {
      await axios.post(REGISTER_URL, data, {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        withCredentials: true,
      });
      setLoginBtn(true);
      setSuccess(
        "Registration successful ! You will redirected in a few seconds..."
      );
      setTimeout(() => {
        handleRegister();
      }, 3000);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.message);
        setErrorInput(error.response.data.input);
      } else if (error.request) {
        console.log(
          "No response received from server... Whoops ! Please, try again later."
        );
      } else {
        console.log("Error", error.message);
      }
    }
  };

  const validateUsername = (username) => {
    if (username.length < 4) {
      return "Your name is too short.";
    } else if (username.length > 23) {
      return "Your name is too long.";
    } else if (!/^[A-Za-z]/.test(username)) {
      return "Your name must start with a letter.";
    } else if (!USER_REGEX.test(username)) {
      return "Only letters, numbers, underscores, and hyphens are allowed.";
    }
    return true; // Validation passed
  };

  return (
    <div className={s.register}>
      <div className={s.register__content}>
        <div
          className={s.register__backtohome}
          onClick={() => handleRegister()}
        >
          <div className={s.register__backtohome__arrow}>
            <ArrowRegisterBackSVG />
          </div>
          <div className={s.register__backtohome__wrapper}>
            <div className={s.register__backtohome__wrapper__logo}>
              <LogoSVG />
            </div>
            <span className={s.backhome}>Back</span>
          </div>
        </div>
        <div className={s.register__content__frame}>
          <h2>Start here</h2>
          <form className={s.register__form} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.formInput}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "Invalid email format",
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby="emailnote"
                className={s.formInput__input}
              />
              {errors.email &&
                (errors.email.type === "required" ? (
                  <p className={s.required}>REQUIRED</p>
                ) : (
                  <p className={s.error}>{errors.email.message}</p>
                ))}
            </div>

            <div className={s.formInput}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                {...register("username", {
                  required: "Username is required",
                  validate: validateUsername,
                })}
                aria-invalid={errors.username ? "true" : "false"}
                aria-describedby="uidnote"
                className={s.formInput__input}
                onChange={() => setErrorInput("")}
              />
              {errors.username &&
                (errors.username.type === "required" ? (
                  <p className={s.required}>REQUIRED</p>
                ) : (
                  <p className={s.error}>{errors.username.message}</p>
                ))}

              {errorInput === "username" && (
                <p className={s.required}>REQUIRED</p>
              )}
            </div>

            <div className={s.formInput}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: PWD_REGEX,
                    message:
                      "6 to 24 characters. Must include uppercase and lowercase letters, a number, and a special character.",
                  },
                })}
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby="pwdnote"
                className={s.formInput__input}
              />
              {errors.password &&
                (errors.password.type === "required" ? (
                  <p className={s.required}>REQUIRED</p>
                ) : (
                  <p className={s.error}>{errors.password.message}</p>
                ))}
            </div>

            <div className={s.formInput}>
              <label htmlFor="confirmPwd">Confirm Password</label>
              <input
                type="password"
                id="confirmPwd"
                {...register("confirmPwd", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                aria-invalid={errors.confirmPwd ? "true" : "false"}
                aria-describedby="confirmPwdnote"
                className={s.formInput__input}
              />
              {errors.confirmPwd &&
                (errors.confirmPwd.type === "required" ? (
                  <p className={s.required}>REQUIRED</p>
                ) : (
                  <p className={s.error}>{errors.confirmPwd.message}</p>
                ))}
            </div>

            <div className={s.register__submit}>
              <button
                type="submit"
                className={
                  isValid
                    ? s.register__submit__btn__valid
                    : s.register__submit__btn
                }
                disabled={!isValid}
              >
                {isValid ? "Register" : "Please fill in the form"}
              </button>
            </div>

            {errorMessage && success === "" && errorInput !== "email" && (
              <p className={s.error}>{errorMessage}</p>
            )}
            {errorInput === "email" && (
              <>
                <div className={s.error__email}>
                  <span className={s.error}>{errorMessage}</span>
                  <div className={s.error__email__clickhere}>
                    <span className={s.error}>Click&nbsp;</span>
                    <a href="">here </a>
                    <span className={s.error}>&nbsp;to sign in.</span>
                  </div>
                </div>
              </>
            )}
            {success && <p className={s.success}>{success}</p>}
          </form>
          <PrivacyPolicy />
        </div>
      </div>
    </div>
  );
}
