import * as React from "react";
const CrossSettingsSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    width={{ width: "100%" }}
    fill="none"
    {...props}
  >
    <circle cx={6} cy={6} r={6} fill="#D9D9D9" />
    <path stroke="#FF7474" strokeLinecap="round" d="m4 4 4 4M4 8l4-4" />
  </svg>
);
export default CrossSettingsSVG;
