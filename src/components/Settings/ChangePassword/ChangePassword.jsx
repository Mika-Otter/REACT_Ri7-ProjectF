import React, { useState, useEffect } from "react";
import s from "../Settings.module.scss";
import { useForm, Controller, set } from "react-hook-form";
import axios from "../../../app/api/axios";
import debounce from "lodash.debounce";
import { useSelector } from "react-redux";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@?$%]).{8,24}$/;
const PWD_URL = "http://localhost:8080/settings/update/pwd";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm({ mode: "onBlur" });

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const userId = useSelector((state) => state.auth.userId);

  const onSubmit = async (data) => {
    try {
      const requestData = {
        userId,
        pwd: data.OldPassword,
        newPwd: data.password,
      };
      const response = await axios.post(PWD_URL, requestData);
      setSuccess("Password changed successfully!");
      setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
      if (error.response) {
        console.log(error.response.data, "eeeeerror");
        setSuccess("");
        setErrorMessage(error.response.data.message); // Display the error message
      } else if (error.request) {
        console.log(
          "No response received from server... Whoops! Please, try again later."
        );
        setErrorMessage(
          "No response received from server... Whoops! Please, try again later."
        );
      } else {
        console.log("Error", error.message);
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  // Watch the values of the old password and new password
  const oldPassword = watch("OldPassword");
  const newPassword = watch("password");
  const confirmPassword = watch("confirmPwd");

  // Custom validation function to check if new password is the same as the old password
  const validateNewPassword = (value) => {
    if (value === oldPassword) {
      return "New password cannot be the same as the old password";
    }
    return true;
  };

  // Debounce validation for confirmPwd
  const validateConfirmPwd = debounce((value) => {
    setErrorMessage("");
    setSuccess("");
    if (value !== newPassword) {
      setError("confirmPwd", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      clearErrors("confirmPwd");
    }
  }, 500);

  useEffect(() => {
    validateConfirmPwd(confirmPassword);
    return () => {
      validateConfirmPwd.cancel();
    };
  }, [confirmPassword]);

  return (
    <>
      <h3 className={s.profil__password__title}>Change Password</h3>
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
            onChange={() => {
              setErrorMessage("");
              setSuccess("");
            }}
          />
          {errors.OldPassword &&
            (errors.OldPassword.type === "required" ? (
              <p className={s.required}>REQUIRED</p>
            ) : (
              <p className={s.error}>{errors.OldPassword.message}</p>
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
              validate: validateNewPassword,
            })}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby="pwdnote"
            className={s.formInput__input}
            onChange={() => {
              setErrorMessage("");
              setSuccess("");
            }}
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
                value === newPassword || "Passwords do not match",
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
        <button
          type="submit"
          className={isValid ? s.btn__valid : s.btn}
          disabled={!isValid}
        >
          {isValid ? "Change Password" : "Please fill in the fields"}
        </button>
        {errorMessage !== "" && <p className={s.error}>{errorMessage}</p>}
        {success && <p className={s.success}>{success}</p>}
      </form>
    </>
  );
}
