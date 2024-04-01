import React from "react";
import s from "../pages.module.scss";
import Menu from "../../components/menu/menu";
import Settings from "../../components/settings/settings";

export default function SettingsPage() {
    return (
        <>
            <section>
                <Menu />
                <div className={s.content}>
                    <Settings />
                </div>
            </section>
        </>
    );
}
