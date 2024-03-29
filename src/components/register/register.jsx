import React, { useState, useEffect } from "react";
import s from "./register.module.scss";
import axios from "../../app/api/axios";
import { useNavigate, Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@?$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGISTER_URL = "http://localhost:8080/server/auth/register";

export default function Register({ register, toggleRegister, setLoginBtn }) {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        username: "",
    });

    // const userRef = useRef();

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        console.log("yooooo", register);
    }, [register]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setError("");
    }, [user, pwd, matchPwd]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //prevent button JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3) {
            setError("Invalid Entry");
            return;
        }
        setSuccess(true);
        try {
            const res = await axios.post(REGISTER_URL, inputs);
            setSuccess(true);
            toggleRegister();
            setLoginBtn(true);
        } catch (err) {
            if (!err?.response) {
                setError("No Server Response");
            } else if (err.response?.status === 409) {
                setError("Username already used");
            } else {
                setError("Registration Failed", err.response.data);
            }
        }
    };

    return (
        <>
            <section>
                <p className={error ? s.error : s.offscreen} aria-live="assertive">
                    {error}
                </p>
                <div className={register ? s.registerForm : s.offscreen}>
                    <div className={s.welcome}>
                        <h2>
                            Welcome, <br />
                            <span>{user ? user : "font lover !"}</span>
                        </h2>
                    </div>
                    <form className={s.registerForm__form} onSubmit={handleSubmit}>
                        <div className={s.registerForm__username}>
                            <label htmlFor="username">Username</label>
                            <input
                                className={s.registerForm__input__field}
                                type="text"
                                id="username"
                                required
                                placeholder="Enter an username"
                                name="username"
                                onChange={(e) => {
                                    setUser(e.target.value);
                                    handleChange(e);
                                }}
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                            />

                            <p
                                id="uidnote"
                                className={
                                    userFocus && user && !validName ? s.instructions : s.offscreen
                                }
                            >
                                4 to 15 characters. Must begin with a letter. Letters, numbers,
                                underscores, <br /> hyphens allowed.
                            </p>
                        </div>
                        <div className={s.registerForm__email}>
                            <label htmlFor="email">Email</label>
                            <input
                                className={s.registerForm__input}
                                type="email"
                                id="email"
                                autoComplete="on"
                                required
                                placeholder="Enter an email"
                                name="email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    handleChange(e);
                                }}
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailnote"
                            />
                            <p
                                id="emailnote"
                                className={
                                    emailFocus && email && !validEmail
                                        ? s.instructions
                                        : s.offscreen
                                }
                            >
                                Just enter a regular email <br />
                            </p>
                        </div>
                        <div className={s.registerForm__pwd}>
                            <label htmlFor="password">Password</label>
                            <input
                                className={s.registerForm__input}
                                type="password"
                                id="password"
                                required
                                placeholder="Enter an password"
                                name="password"
                                onChange={(e) => {
                                    setPwd(e.target.value);
                                    handleChange(e);
                                }}
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                            />
                            <p
                                id="pwdnote"
                                className={pwdFocus && !validPwd ? s.instructions : s.offscreen}
                            >
                                8 to 25 characters. Must includ uppercase and lowercase letters, a
                                number <br /> and a special character.
                            </p>
                        </div>
                        <div className={s.registerForm__confirmPwd}>
                            <label htmlFor="confirmPwd">Confirm password</label>
                            <input
                                className={s.registerForm__input}
                                type="password"
                                id="confirmPwd"
                                required
                                placeholder="Please confirm the password"
                                name="confirmPwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                aria-invalid={matchFocus ? "false" : "true"}
                                aria-describedby="confirmPwdnote"
                            />
                            <p
                                id="confirPwdnote"
                                className={matchFocus && !validMatch ? s.instructions : s.offscreen}
                            >
                                Must match with the first password input field. <br />
                                <br />
                            </p>
                        </div>

                        <div className={s.wrapper}>
                            <div id={s.hover}></div>
                            <button
                                className={s.registerForm__btn}
                                disabled={
                                    !validEmail || !validName || !validMatch || !validPwd
                                        ? true
                                        : false
                                }
                                type="submit"
                            >
                                {!validEmail || !validName || !validMatch || !validPwd
                                    ? "You need to complete correctly all the fields"
                                    : "Submit"}
                            </button>
                        </div>
                        {error && <p className={s.error}>{error}</p>}
                        <span
                            className={s.backhome}
                            onClick={() => {
                                toggleRegister();
                            }}
                        >
                            Back to home page
                        </span>
                    </form>
                </div>
            </section>
            {/* menu login username password display full css ? */}
            {/* menu subscribe username password display full css ? */}
        </>
    );
}
