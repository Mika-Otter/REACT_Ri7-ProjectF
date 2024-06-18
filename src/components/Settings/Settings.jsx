import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import s from "./Settings.module.scss";

import axios from "../../app/api/axios";
// import { setUserName } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import ChangeUsername from "./ChangeUsername/ChangeUsername";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,15}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@?$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SETTING_URL = "http://localhost:8080/update/pwd";

export default function Settings() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const userId = useSelector((state) => state.auth.userId);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });
  const [errorMessage, setErrorMessage] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (data) => {
    try {
      await axios.post(SETTING_URL, data);
      setSuccess(
        "Registration successful ! You will redirected in a few seconds..."
      );
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
    <>
      <section className={s.profil__section}>
        <div className={s.title}>
          <h2 className={s.title__title}>Settings</h2>
        </div>
        <div className={s.profil}>
          <ChangeUsername />
          <h3 className={s.profil__user__title}>Change Password</h3>
          <form
            className={s.profil__password}
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            id="passwordForm"
          >
            <div className={s.profil__password__old}>
              <label htmlFor="OldPassword">Old password</label>
              <input
                type="password"
                id="OldPassword"
                {...register("OldPassword", {
                  required: "Password is required",
                  pattern: {
                    value: PWD_REGEX,
                    message:
                      "8 to 24 characters. Must include uppercase and lowercase letters, a number, and a special character.",
                  },
                })}
                aria-invalid={errors.OldPassword ? "true" : "false"}
                aria-describedby="pwdnote"
                className={s.formInput__input}
              />
              {errors.OldPassword &&
                (errors.OldPassword.type === "required" ? (
                  <p className={s.required}>REQUIRED</p>
                ) : (
                  <p className={s.error}>{errors.password.message}</p>
                ))}
            </div>
            <div className={s.profil__password__new}>
              <label htmlFor="password">New password</label>
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
            <div className={s.profil__password__confirm}>
              <label htmlFor="confirmPwd">Confirm new password</label>
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
            <p></p>
            <div className={s.wrapper__settings}>
              <div id={s.hover}></div>
              <button
                type="submit"
                className={
                  isValid
                    ? s.register__submit__btn__valid
                    : s.register__submit__btn
                }
                disabled={!isValid}
              >
                {isValid ? "Change Password" : "Please fill in the fields"}
              </button>
            </div>
            {success && <p className={s.success}>{success}</p>}
          </form>

          <h3 className={s.profil__user__title}>Email Preferences</h3>
          <div className={s.email__preferences}>
            <span>user.email</span>
            <button type="button" className={s.manage}>
              Manage
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
