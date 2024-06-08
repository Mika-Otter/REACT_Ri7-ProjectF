import React, { useState } from "react";
import s from "./PrivacyPolicy.module.scss";
import SmallArrowDownSVG from "../SVG/SmallArrowDownSVG";
import cn from "classnames";

export default function PrivacyPolicy() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  return (
    <>
      <div className={s.privacy}>
        <div
          className={s.privacy__content}
          onClick={() => setIsPrivacyOpen((prev) => !prev)}
        >
          <span className={s.privacy__span}>Privacy policy</span>
          <div
            className={cn(
              s.privacy__content__arrow,
              isPrivacyOpen && s.privacy__content__arrow__active
            )}
          >
            <SmallArrowDownSVG />
          </div>
        </div>
        {isPrivacyOpen && (
          <div
            className={cn(
              `${s.privacy__content__text} ${isPrivacyOpen ? s.open : ""}`
            )}
          >
            <p>
              We collect your email address solely to help you recover your
              password if lost. We prioritize the security of our user&rsquo;s
              private information and implement stringent measures to protect
              your data. Our open-source application ensures complete
              transparency in how we handle your information. While we use
              Google Analytics to optimize the application, rest assured that
              your email address is not shared with third parties.
            </p>
            <a href="#">Read more...</a>
          </div>
        )}
      </div>
    </>
  );
}
