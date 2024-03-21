import React from "react";
import s from "./home.module.scss";
import TestText from "../../components/testText";
import Folder from "../../components/folder";
import Logout from "../../components/logout";
import { useSelector } from "react-redux";

export default function Home() {
    const username = useSelector((state) => state.auth.username);
    const fonts = useSelector((state) => state.fonts.value);

    console.log(fonts);

    return (
        <>
            <section>
                <div className={s.hey}>
                    <h2>Hey {username}_</h2>
                </div>
                <div className={s.favorites__typos}>
                    <h3>Your favorites typographies</h3>
                    <div className={s.favorite__box}>
                        {fonts.map((font, i) => (
                            <div className={s.favorite__box__wrapper} key={font.name + i}>
                                <div className={s.favorite}>
                                    <div className={s.favorite__wrapper}>
                                        <div className={s.favorite__wrapper__text}>
                                            <span style={{ fontFamily: font.name }}>
                                                {font.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <span className={s.legend}>{font.name}</span>
                                <div className={s.favorite__wrapper__note}>
                                    {/* rating squares */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Folder />
                <TestText />
                <Logout />
            </section>
        </>
    );
}
