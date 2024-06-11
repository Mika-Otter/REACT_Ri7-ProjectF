import React from "react";
import s from "../pages.module.scss";
import Folder from "../../components/Folder/Folder";
import Menu from "../../components/Menu/Menu";
import Favorites from "../../components/Favorites/Favorites";

export default function FavoritesPage() {
  return (
    <>
      <section>
        <Menu />
        <div className={s.content}>
          <Favorites />
        </div>
      </section>
    </>
  );
}
