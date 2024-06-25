import React from "react";
import cn from "classnames";
import s from "./VariableText.module.scss";

export default function VariableTextSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit,
}) {
  <div className={cn(s.rangeSlider, s.range)}>
    <label htmlFor={label} className={s.range__label}>
      {label}
    </label>
    <input
      className={s.input__range}
      type="range"
      min={min}
      max={max}
      step={step}
      name={label}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
    />
    <span className={s.range__span}>
      {value} {unit}
    </span>
  </div>;
}
