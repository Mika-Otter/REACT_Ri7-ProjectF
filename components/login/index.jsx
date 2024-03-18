import React, { useState } from "react";
import s from "./login.module.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const [err, setError] = useState(null);

    const navigate = useNavigate();

    function handleChange(e) {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/server/auth/login", inputs);
            navigate("/home");
        } catch (err) {
            setError(err.response.data);
        }
    }

    return (
        <>
            <button className={s.login} type="button">
                Sign up
            </button>
            <div className={s.loginForm}>
                <form className={s.loginForm__form}>
                    <div className={s.loginForm__email}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={s.loginForm__password}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                    <button className={s.loginForm__connect} type="button" onClick={handleSubmit}>
                        Login
                    </button>
                    {err && <p>{err}</p>}
                    <span>Don&rsquo;t you have an account ? </span>{" "}
                    <Link to="/register">Register</Link>
                </form>
            </div>
            {/* menu login username password display full css ? */}
            {/* menu subscribe username password display full css ? */}
        </>
    );
}
