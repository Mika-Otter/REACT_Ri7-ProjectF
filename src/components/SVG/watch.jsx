import * as React from "react";
const WatchingSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={14} fill="none" {...props}>
        <path
            fill="#F8F8F7"
            stroke="#120C0C"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M1 7c1.202-3.477 4.777-6 9-6 4.224 0 7.798 2.523 9 6-1.202 3.477-4.776 6-9 6-4.223 0-7.798-2.523-9-6Z"
        />
        <path
            fill="#120C0C"
            stroke="#120C0C"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
        />
        <circle cx={8} cy={4} r={2} fill="#F8F8F7" />
    </svg>
);
export default WatchingSVG;
