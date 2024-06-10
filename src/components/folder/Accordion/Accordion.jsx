import React, { useState } from "react";
import AccordionItem from "./AccordionItem/AccordionItem";

export default function Accordion({ data, fonts, handleFonts }) {
  const [curOpen, setIsOpen] = useState(null);

  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem
          key={i}
          title={el.title}
          fonts={fonts}
          number={i}
          curOpen={curOpen}
          setIsOpen={setIsOpen}
          isFavorite={el.isFavorite}
          handleFonts={handleFonts}
        />
      ))}
    </div>
  );
}
