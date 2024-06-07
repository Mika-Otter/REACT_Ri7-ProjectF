import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserId, setUserName } from "../../features/authSlice";

import s from "./connect.module.scss";
import axios from "axios";

export default function Connect({ toggleRegister, toggleLogin }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.auth.userId);
    const [err, setError] = useState(null);
    const [inputsConnect, setInputsConnect] = useState({
        email: "",
        password: "",
    });

    function handleLogin(userData) {
        dispatch(setUserId(userData.id));
        dispatch(setUserName(userData.username));
    }

    function handleChange(e) {
        setInputsConnect((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/server/auth/login", inputsConnect);
            localStorage.setItem("token", res.data.token);
            handleLogin(res.data);
            navigate("/home");
        } catch (err) {
            setError(err.response.data);
        }
    }

    return (
        <>
            <div className={s.loginForm}>
                <form className={s.loginForm__form} onSubmit={handleSubmit}>
                    <div className={s.loginForm__fields}>
                        <div className={s.loginForm__email}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                autoComplete="on"
                                name="email"
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </div>
                        <div className={s.loginForm__password}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                autoComplete="off"
                                name="password"
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </div>
                    </div>{" "}
                    <div className={s.wrapper}>
                        <div id={s.hover}></div>
                        <button type="submit" className={s.loginForm__btn}>
                            <span>Login</span>
                        </button>
                    </div>
                    {err && <p>{err}</p>}
                    <div className={s.register}>
                        <span>Don&rsquo;t you have an account ? </span>{" "}
                        <Link
                            onClick={() => {
                                toggleLogin();
                                toggleRegister();
                            }}
                        >
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
