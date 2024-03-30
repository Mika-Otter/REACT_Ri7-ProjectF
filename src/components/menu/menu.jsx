import React from "react";
import s from "./menu.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Menu() {
    const username = useSelector((state) => state.auth.username);
    return (
        <>
            <div className={s.menu}>
                <div className={s.menu__profil}>
                    <div className={s.menu__profil__text}>
                        <span>Hey_</span>
                        <span>{username}</span>
                    </div>
                    <span className={s.menu__profil__text__bigletter}>{username[0]}</span>
                </div>
                <div className={s.menu__menu}>
                    <Link to="/home">
                        Your favorites <br />
                        typefaces
                    </Link>
                    <Link to="/fonts">All your fonts</Link>
                    <Link to="/variable">Variable text</Link>
                    <Link to="/fonttest">Test fonts</Link>
                </div>
                <div className={s.menu__settings}>
                    <Link to="/settings">Settings</Link>
                    <button type="button">Logout</button>
                </div>
                <div className={s.menu__logo}>
                    <span className={s.menu__logo__typ}>typ_</span>
                    <span className={s.menu__logo__pov}>pov</span>
                </div>
            </div>
        </>
    );
}
