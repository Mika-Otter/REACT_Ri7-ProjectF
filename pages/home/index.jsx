import React from "react";
import s from "home.module.scss";

export default function Home() {
    return (
        <>
            <section>
                <div className={s.title}>
                    <h2>All your favorite</h2>
                    <h2>typographies in</h2>
                    <h2>one place</h2>

                    <button className={s.getStarted}>Get started </button>
                    <p>
                        Select, rate, organize in folders, view, try... povTyp is born during my
                        studies in Ri7 School. No more files where you can't see anything. Stop
                        wasting time on Illustrator plates. Try out your typefaces here. Add,
                        create, delete, note, sort, share and have fun!
                    </p>
                </div>
                <div className={s.bento}>
                    <div className={s.bento__firstpic}></div>
                    <div className={s.bento__secondpic}></div>
                    <div className={s.bento__thirdpic}></div>
                </div>
            </section>
        </>
    );
}
