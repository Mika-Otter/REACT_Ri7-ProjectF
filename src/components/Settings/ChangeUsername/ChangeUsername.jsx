import React, { useState } from "react";
import s from "../Settings.module.scss";
import { useForm } from "react-hook-form";
import axios from "../../../app/api/axios";
import { useSelector } from "react-redux";
import { setUserName } from "../../../features/authSlice";
import { useDispatch } from "react-redux";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,15}$/;
const UPDATENAME_URL = "http://localhost:8080/settings/update/name";

export default function ChangeUsername() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const userId = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.username);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmitName = async (data) => {
    if (data.username === username) {
      setSuccess("User name already set !");
      setErrorMessage("");
      return;
    }
    try {
      const requestData = {
        userId,
        userName: data.username,
      };
      await axios.post(UPDATENAME_URL, requestData);
      dispatch(setUserName(data.username));
      setSuccess("The user name has been changed !");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.message);
        setErrorInput(error.response.data.input);
      } else if (error.request) {
        console.log(
          "No response received from server... Whoops! Please, try again later."
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
      <form
        className={s.profil__user}
        onSubmit={handleSubmit(onSubmitName)}
        autoComplete="off"
        id="usernameForm"
      >
        <h3 className={s.profil__user__title}>User Profile</h3>
        <div className={s.profil__user__name}>
          <label htmlFor="username">Name</label>
          <input
            type="text"
            id="username"
            defaultValue={username}
            {...register("username", {
              required: "Username is required",
              validate: validateUsername,
              onChange: (e) => {
                setSuccess("");
                setErrorInput("");
                setErrorMessage("");
              },
            })}
            aria-invalid={errors.username ? "true" : "false"}
            aria-describedby="uidnote"
            className={s.formInput__input}
          />
          {success === "name" && <p className={s.success}>Username changed</p>}
          {errors.username && (
            <p className={s.error}>{errors.username.message}</p>
          )}
        </div>
        <div className={s.wrapper__settings}>
          <div id={s.hover}></div>
          <button
            form="usernameForm"
            type="submit"
            className={isValid ? s.btn__valid : s.btn}
            disabled={!isValid}
          >
            {isValid ? "Change username" : "Enter a valid username"}
          </button>
          {errorMessage && success === "" && errorInput !== "email" && (
            <p className={s.error}>{errorMessage}</p>
          )}
          {success && <p className={s.success}>{success}</p>}
        </div>
      </form>
    </>
  );
}
