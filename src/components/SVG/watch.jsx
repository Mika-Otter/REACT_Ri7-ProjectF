import * as React from "react";
const WatchingSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={27} height={18} fill="none" {...props}>
        <path
            fill="#F8F8F7"
            stroke="#120C0C"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M1 8.813C2.63 4.285 7.482 1 13.211 1c5.73 0 10.58 3.285 12.21 7.813-1.63 4.528-6.48 7.813-12.21 7.813S2.631 13.341 1 8.813Z"
        />
        <path
            fill="#120C0C"
            stroke="#120C0C"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 8A6 6 0 1 1 9 8a6 6 0 0 1 12 0Z"
        />
        <circle cx={10.5} cy={5.5} r={2.5} fill="#F8F8F7" />
    </svg>
);
export default WatchingSVG;
