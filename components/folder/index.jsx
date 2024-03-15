import React, { useState } from "react";
import s from "./folder.module.scss";
import cn from "classnames";

export default function Folder() {
    return (
        <>
            <section className={s.folder}>
                <div className={s.folder__folder}>
                    <span>Main :</span>
                </div>
            </section>
        </>
    );
}
