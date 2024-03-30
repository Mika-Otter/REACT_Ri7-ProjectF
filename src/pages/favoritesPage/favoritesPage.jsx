import React from "react";
import s from "../pages.module.scss";
import Folder from "../../components/folder/folder";
import Menu from "../../components/menu/menu";
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
