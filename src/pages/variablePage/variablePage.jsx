import React from "react";
import s from "../pages.module.scss";
import Folder from "../../components/folder/folder";
import Menu from "../../components/menu/menu";
import Variable from "../../components/variable/variable";

export default function VariablePage() {
    return (
        <>
            <section>
                <Menu />
                <div className={s.content}>
                    <Variable />
                </div>
                <Folder />
            </section>
        </>
    );
}
