import React from "react";
import s from "./AccordionItem.module.scss";
import cn from "classnames";

export default function AccordionItem({
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
    <div
      className={cn(s.accordion__item, isOpen ? s.open : s.close)}
      onClick={() => setIsOpen(number)}
    >
      <div className={s.accordion__item__header}>
        <span className={s.accordion__item__header__title}>{title}</span>
        {isOpen ? (
          <span className={s.accordion__item__header__icon}>-</span>
        ) : (
          <span className={s.accordion__item__header__icon}>+</span>
        )}
      </div>

      {curOpen === number && (
        <div className={s.accordion__item__content}>
          {isFavorite
            ? fonts
                .filter((font) => font.favorite)
                .map((font, i) => (
                  <div className={s.fonts} key={font.name + i}>
                    <input
                      type="checkbox"
                      name={font.name}
                      checked={font.checked}
                      onChange={() => handleFonts(font.name)}
                    />
                    <label
                      htmlFor={font.name}
                      style={{ fontFamily: `${font.name}` }}
                    >
                      {font.name}
                    </label>
                  </div>
                ))
            : fonts.map((font, i) => (
                <div className={s.fonts} key={font.name + i}>
                  <input
                    type="checkbox"
                    name={font.name}
                    checked={font.checked}
                    onChange={() => handleFonts(font.name)}
                  />
                  <label
                    htmlFor={font.name}
                    style={{ fontFamily: `${font.name}` }}
                  >
                    {font.name}
                  </label>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}
