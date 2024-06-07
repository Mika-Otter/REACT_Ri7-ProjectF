// FormInput.jsx
import React from "react";
import s from "./FormInput.module.scss";

export default function FormInput({
  label,
  id,
  type,
  placeholder,
  validation,
  register,
  errors,
}) {
  return (
    <>
      {" "}
      <div className={s.formInput}>
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(id, validation)}
          aria-invalid={errors[id] ? "true" : "false"}
          aria-describedby={`${id}note`}
        />
        {errors[id] && <p className={s.error}>{errors[id].message}</p>}
      </div>
    </>
  );
}
