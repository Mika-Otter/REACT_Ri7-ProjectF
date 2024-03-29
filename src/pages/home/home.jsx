import React from "react";
import s from "./home.module.scss";
import Folder from "../../components/folder/folder";
import Favorites from "../../components/favorites/favorites";
import Menu from "../../components/menu/menu";

export default function Home() {
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
