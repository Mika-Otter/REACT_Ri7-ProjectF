import React, { useState } from "react";
import s from "./SettingsFont.module.scss";
import cn from "classnames";
import StarInactiveSVG from "../SVG/StarInactiveSVG";
import StarActiveSVG from "../SVG/StarActiveSVG";
import TrashSVG from "../SVG/TrashSVG";
import CrossSettingsSVG from "../SVG/CrossSettingsSVG";

export default function SettingsFont({
  font,
  userId,
  ratings,
  handleRating,
  deleteFonts,
  onRatingChange,
}) {
  const [openSettings, setOpenSetting] = useState(false);

  return (
    <>
      <div
        className={cn(s.settingsFont, openSettings && s.settingsFont__open)}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={s.settingsFont__openandclose}
          onClick={(e) => {
            e.stopPropagation();
            setOpenSetting((prev) => !prev);
          }}
        >
          {openSettings && (
            <div className={s.settingsFont__close}>
              <CrossSettingsSVG />
            </div>
          )}
          <span>...</span>
        </div>

        <div className={s.settingsFont__note}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={font.name + i} className={s.settingsFont__note__ctn}>
              <div className={s.settingsFont__note__ctn__input}>
                {ratings[font.name] >= i + 1 ? (
                  <div className={cn(s.settingsFont__star)}>
                    <StarActiveSVG />
                  </div>
                ) : (
                  <div className={cn(s.settingsFont__star)}>
                    <StarInactiveSVG />
                  </div>
                )}
                <input
                  type="checkbox"
                  checked={ratings[font.name] >= i + 1}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    handleRating(userId, font.id, font.name, i + 1);
                    onRatingChange();
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          className={s.settingsFont__trash}
          onClick={(e) => {
            e.stopPropagation();
            deleteFonts(font.id);
          }}
        >
          <TrashSVG />
        </div>
      </div>
    </>
  );
}
