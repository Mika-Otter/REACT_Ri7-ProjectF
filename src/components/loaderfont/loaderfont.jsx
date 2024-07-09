import React from "react";
import { useSelector } from "react-redux";

export default function Loaderfont() {
  const fonts = useSelector((state) => state.fonts.value);

  return (
    <>
      {fonts.map((font, index) => (
        <style key={`style-${index}`}>
          {`
                        @font-face {
                            font-family: '${font.name}';
                            src: url(${font.url});
                        }

                        .font-${font.name} {
                            font-family: '${font.name}', sans-serif;
                        }
                    `}
        </style>
      ))}
    </>
  );
}
