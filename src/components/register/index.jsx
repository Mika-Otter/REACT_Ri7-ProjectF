import React, { useState } from "react";
import s from "./register.module.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    function handleChange(e) {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/server/auth/register", inputs);
            navigate("/login");
        } catch (err) {
            setError(err.response.data);
        }
    }

    return (
        <>
            <button className={s.register} type="button">
                Sign up
            </button>
            <div className={s.registerForm}>
                <form className={s.registerForm__form}>
                    <div className={s.registerForm__email}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={s.registerForm__password}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className={s.registerForm__connect}
                        onClick={handleSubmit}
                        type="button"
                    >
                        Subscribe
                    </button>
                    {error && <p>{error}</p>}
                    <Link to="/login">Back to login page</Link>
                </form>
            </div>
            {/* menu login username password display full css ? */}
            {/* menu subscribe username password display full css ? */}
        </>
    );
}
