import React from "react";
import s from "../pages.module.scss";
import Folder from "../../components/Folder/Folder";
import Menu from "../../components/Menu/Menu";
import AllFonts from "../../components/Allfonts/AllFonts";

export default function AllFontsPage() {
  return (
    <>
      <section>
        <Menu />
        <AllFonts />
      </section>
    </>
  );
}
