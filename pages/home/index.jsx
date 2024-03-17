import React from "react";
import s from "home.module.scss";

export default function Home() {
    return (
        <>
            <section>
                <div className={s.hey}>
                    <h2>Hey {username}_</h2>
                </div>
                <div className={s.favorites__typos}>
                    {/* for each typo favorites */}
                    <div className={s.favorite}>
                        <div className={s.favorite__wrapper}>
                            <div className={s.favorite__wrapper__text}>
                                <span>{font.name}</span>
                            </div>
                            <div className={s.favorite__wrapper__note}>{/* rating squares */}</div>
                        </div>
                        <span>{font.name}</span>
                    </div>
                </div>
            </section>
        </>
    );
}
