import React from "react";
import s from "./home.module.scss";
import Folder from "../../components/folder";
import Favorites from "../../components/favorites";

export default function Home() {
    return (
        <>
            <section>
                <Favorites />
                <Folder />
            </section>
        </>
    );
}
