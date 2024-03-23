import React from "react";
import s from "./home.module.scss";
import TestText from "../../components/testText";
import Folder from "../../components/folder";
import Logout from "../../components/logout";
import Favorites from "../../components/favorites";

export default function Home() {
    return (
        <>
            <section>
                <Favorites />
                <Folder />
                <TestText />
                <Logout />
            </section>
        </>
    );
}
