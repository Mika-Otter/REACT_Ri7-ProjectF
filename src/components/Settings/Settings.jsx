import React from "react";
import s from "./Settings.module.scss";
import ChangeUsername from "./ChangeUsername/ChangeUsername";
import ChangePassword from "./ChangePassword/ChangePassword";

export default function Settings() {
  return (
    <>
      <section className={s.profil__section}>
        <div className={s.title}>
          <h2 className={s.title__title}>Settings</h2>
        </div>
        <div className={s.profil}>
          <ChangeUsername />
          <h3 className={s.profil__user__title}>Change Password</h3>
          <ChangePassword />
        </div>
      </section>
    </>
  );
}
