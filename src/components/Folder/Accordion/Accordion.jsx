import React, { useState } from "react";
import s from "./Accordion.module.scss";
import cn from "classnames";

export default function Accordion({ data, fonts, handleFonts }) {
  const [curOpen, setIsOpen] = useState(null);

  return (
    <div className={s.accordion}>
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

function AccordionItem({
  number,
  title,
  fonts,
  curOpen,
  setIsOpen,
  isFavorite,
  handleFonts,
}) {
  const isOpen = number === curOpen;

  return (
    <div className={cn(s.accordion__item, isOpen ? s.open : s.close)}>
      <div
        className={s.accordion__item__header}
        onClick={() => {
          number === curOpen ? setIsOpen(null) : setIsOpen(number);
        }}
      >
        <span className={s.accordion__item__header__title}>{title}</span>
        {isOpen ? (
          <span className={s.accordion__item__header__icon}>-</span>
        ) : (
          <span className={s.accordion__item__header__icon}>+</span>
        )}
      </div>

      {curOpen === number && (
        <div className={s.accordion__item__content}>
          {isFavorite ? (
            fonts.filter((font) => font.favorite).length > 0 ? (
              fonts
                .filter((font) => font.favorite)
                .map((font, i) => (
                  <div className={s.fonts} key={font.name + i}>
                    <input
                      type="checkbox"
                      name={font.name}
                      checked={font.checked}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleFonts(font.name);
                      }}
                    />
                    <label
                      htmlFor={font.name}
                      style={{ fontFamily: `${font.name}` }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFonts(font.name);
                      }}
                    >
                      {font.name}
                    </label>
                  </div>
                ))
            ) : (
              <p className={s.emptylist}>This list is currently empty...</p>
            )
          ) : (
            fonts.map((font, i) => (
              <div
                className={s.fonts}
                key={font.name + i}
                onClick={(e) => {
                  e.stopPropagation();
                  // Toggle the checkbox
                  handleFonts(font.name);
                }}
              >
                <input
                  type="checkbox"
                  name={font.name}
                  checked={font.checked}
                  onChange={(e) => {
                    // Prevent the event from bubbling up to the parent div
                    e.stopPropagation();
                    handleFonts(font.name);
                  }}
                />
                <label
                  htmlFor={font.name}
                  style={{ fontFamily: `${font.name}` }}
                >
                  {font.name}
                </label>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
