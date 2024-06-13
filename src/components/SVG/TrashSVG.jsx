import * as React from "react";
const TrashSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 11"
    style={{ width: "100%" }}
    fill="none"
    {...props}
  >
    <path
      stroke="#FF7474"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.5 3-.434 6.071A1 1 0 0 1 7.07 10H2.931a1 1 0 0 1-.998-.929L1.5 3M4 5v3m2-3v3m.5-5V1.5A.5.5 0 0 0 6 1H4a.5.5 0 0 0-.5.5V3M1 3h8"
    />
  </svg>
);
export default TrashSVG;
