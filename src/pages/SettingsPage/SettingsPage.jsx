import React from "react";
import s from "../pages.module.scss";
import Menu from "../../components/Menu/Menu";
import Settings from "../../components/Settings/Settings";

export default function SettingsPage() {
  return (
    <>
      <section>
        <div className={s.content}>
          <Settings />
        </div>
      </section>
    </>
  );
}
