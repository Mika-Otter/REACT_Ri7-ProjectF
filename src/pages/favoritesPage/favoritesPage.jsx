import React from "react";
import s from "../pages.module.scss";
import Folder from "../../components/Folder/Folder";
import Menu from "../../components/Menu/Menu";
import Favorites from "../../components/favorites/favorites";

export default function FavoritesPage() {
  return (
    <>
      <section>
        <Menu />
        <div className={s.content}>
          <Favorites />
        </div>
        <Folder />
      </section>
    </>
  );
}
