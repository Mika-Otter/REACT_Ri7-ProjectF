import React, { useState } from "react";
import { useForm } from "react-hook-form";
import s from "./NewRegister.module.scss";
import axios from "../../app/api/axios";
import ArrowRegisterSVG from "../SVG/ArrowRegisterSVG";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@?$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGISTER_URL = "http://localhost:8080/server/auth/register";

export default function NewRegister({ handleRegister, setLoginBtn }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      await axios.post(REGISTER_URL, data);
      setLoginBtn(true);
      handleRegister();
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className={s.register}>
      <div className={s.register__content}>
        <div
          className={s.register__backtohome}
          onClick={() => handleRegister()}
        >
          <div className={s.register__backtohome__arrow}>
            <ArrowRegisterSVG />
          </div>
          <div className={s.register__backtohome__wrapper}>
            <span className={s.backhome}>Back to home page</span>
            <span className={s.backhome}>Back to home page</span>
          </div>
        </div>
        <div className={s.register__content__frame}>
          <h2>Start here</h2>
          <form className={s.register__form} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.formInput}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: USER_REGEX,
                    message:
                      "4 to 23 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.",
                  },
                })}
                aria-invalid={errors.username ? "true" : "false"}
                aria-describedby="uidnote"
                className={s.formInput__input}
              />
              {errors.username &&
                (errors.username.type === "required" ? (
                  <p className={s.required}>REQUIRED</p>
                ) : (
                  <p className={s.error}>{errors.username.message}</p>
                ))}
            </div>

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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: PWD_REGEX,
                    message:
                      "8 to 24 characters. Must include uppercase and lowercase letters, a number, and a special character.",
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
                className={s.register__submit__btn}
                disabled={!isValid}
              >
                Register now
              </button>
            </div>

            {error && <p className={s.error}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
