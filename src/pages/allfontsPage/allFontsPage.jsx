import React from "react";
import s from "../pages.module.scss";
import Folder from "../../components/folder/folder";
import Menu from "../../components/Menu/Menu";
import AllFonts from "../../components/allfonts/allFonts";

export default function AllFontsPage() {
  return (
    <>
      <section>
        <Menu />
        <div className={s.content}>
          <AllFonts />
        </div>
      </section>
    </>
  );
}
