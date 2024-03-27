import React from "react";
import s from "./welcome.module.scss";
import Login from "../../components/login";

export default function Welcome() {
    return (
        <>
            <section>
                <div className={s.navbar}>
                    <div className={s.navbar__title}>
                        <span className={s.navbar__title__Typ}>typ_</span>
                        <span className={s.navbar__title__Pov}>pov</span>
                    </div>
                    <div className={s.navbar__login}>
                        <button type="button">Login</button>
                        {/* <Login /> */}
                    </div>
                </div>
                <div className={s.getstarted}>
                    <div className={s.getstarted__title}>
                        <h2>All your favorites</h2>
                        <h2>typographies</h2>
                        <h2>one place</h2>
                    </div>
                    <button type="button">
                        Get started{" "}
                        <div id={s.wrapper__arrow}>
                            <img
                                src="/assets/welcome-img/arrow-started.png"
                                alt="arrow"
                                id={s.arrow}
                            />
                        </div>
                    </button>
                    <p>A ㅅЖㅍ C ﺏDㅟ EЙ F G예 Hは I J Kﺙ УL 우むM ﺽNびЦﻕㅟO み... </p>
                </div>
                <aside className={s.pictures}>
                    <img
                        src="/assets/welcome-img/favorites.png"
                        alt="favorites"
                        className={s.pictures__favorites}
                    />
                    <img
                        src="/assets/welcome-img/folder.png"
                        alt="folder"
                        className={s.pictures__folder}
                    />
                    <img
                        src="/assets/welcome-img/variabletext.png"
                        alt="variabletext"
                        className={s.pictures__variabletext}
                    />
                </aside>
            </section>
        </>
    );
}
