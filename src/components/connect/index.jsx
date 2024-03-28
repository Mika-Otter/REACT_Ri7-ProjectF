import React, { useState } from "react";
import s from "./connect.module.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserId, setUserName } from "../../features/authSlice";
import cn from "classnames";

export default function Connect() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    function handleLogin(userData) {
        dispatch(setUserId(userData.id));
        dispatch(setUserName(userData.username));
        console.log(userId);
    }

    const [err, setError] = useState(null);

    const navigate = useNavigate();

    function handleChange(e) {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/server/auth/login", inputs);
            console.log(res.data, "DAAAAAATA"); // ENV !!!!
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
                        <Link to="/register">Register</Link>
                    </div>
                </form>
            </div>

            <button className={s.btn}></button>

            {/* menu login username password display full css ? */}
            {/* menu subscribe username password display full css ? */}
        </>
    );
}
