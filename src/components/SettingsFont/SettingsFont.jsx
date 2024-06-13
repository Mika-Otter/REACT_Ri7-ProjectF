import React from "react";
import s from "./SettingsFont.module.scss";

export default function SettingsFont({ font, userId, ratings, handleRating }) {
  return (
    <>
      <div className={s.settingsFont}>
        <span>...</span>
        <div className={s.settingsFont__note}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={font.name + i} className={s.settingsFont__note__ctn}>
              <div className={s.settingsFont__note__ctn__input}>
                <input
                  type="checkbox"
                  checked={ratings[font.name] >= i + 1}
                  onChange={() =>
                    handleRating(userId, font.id, font.name, i + 1)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
