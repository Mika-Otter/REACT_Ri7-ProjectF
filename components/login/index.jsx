import React from "react";
import s from "./login.module.scss";

export default function Login() {
    return (
        <>
            <button className={s.login} type="button">
                Login
            </button>
            <div className={s.loginForm}>
                <form action="" className={s.loginForm__form}>
                    <div className={s.loginForm__email}>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter Email" />
                    </div>
                    <div className={s.loginForm__password}>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter password" />
                    </div>
                    <button className={s.loginForm__connect} type="button">
                        Connect
                    </button>
                </form>
            </div>
            {/* menu login username password display full css ? */}
            {/* menu subscribe username password display full css ? */}
        </>
    );
}
