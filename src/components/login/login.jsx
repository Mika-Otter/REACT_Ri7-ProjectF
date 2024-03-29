import React, { useEffect, useRef } from "react";
import s from "./login.module.scss";
import Connect from "../connect/connect";
import cn from "classnames";

export default function Login({ active, toggleLogin, toggleRegister }) {
    const container = useRef();
    const tl = useRef();
    const button = useRef();

    useEffect(() => {
        console.log("yoo", active);
    }, [active]);

    return (
        <>
            <div
                className={cn(s.login, active ? s.login__active : s.login__inactive)}
                ref={container}
            >
                <div className={s.login__ctn}>
                    <div className={s.login__btn__ctn} ref={button}>
                        <button
                            className={s.login__btn}
                            type="submit"
                            onClick={() => toggleLogin()}
                        >
                            Login
                        </button>
                    </div>
                    <div className={active ? s.connect : s.offscreen} id="connect">
                        <Connect toggleRegister={toggleRegister} toggleLogin={toggleLogin} />
                    </div>
                </div>
            </div>
        </>
    );
}
