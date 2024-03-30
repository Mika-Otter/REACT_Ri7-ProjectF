import * as React from "react";
const VariableSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={26} height={14} fill="none" {...props}>
        <path
            stroke="#120C0C"
            strokeLinecap="round"
            strokeWidth={1.5}
            d="M1 2h23.526M1 7h23.526M1 12h23.526"
        />
        <path
            fill="#120C0C"
            stroke="#120C0C"
            strokeWidth={0.5}
            d="M17.75 2a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0ZM9.75 7a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0ZM21.75 12a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Z"
        />
    </svg>
);
export default VariableSVG;
