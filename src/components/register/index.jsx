import React, { useState, useRef, useEffect } from "react";
import s from "./register.module.scss";
import axios from "../../app/api/axios";
import { useNavigate, Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@?$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGISTER_URL = "/server/auth/register";

export default function Register() {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        username: "",
    });

    const userRef = useRef();

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
        userRef.current.focus();
    }, []);

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

    function handleChange(e) {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
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

            console.log(res.data);
            console.log(res.accessToken);
            setSuccess(true);
            navigate("/login");
        } catch (err) {
            if (!err?.response) {
                setError("No Server Response");
            } else if (err.response?.status === 409) {
                setError("Username already used");
            } else {
                setError("Registration Failed", err.response.data);
            }
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Succes!</h1>
                    <p>
                        <Link to="/login">Back to login page</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p className={error ? s.error : s.offscreen} aria-live="assertive">
                        {error}
                    </p>
                    <div className={s.registerForm}>
                        <form className={s.registerForm__form} onSubmit={handleSubmit}>
                            <div className={s.registerForm__username}>
                                <label htmlFor="username">Username</label>
                                <input
                                    className={s.registerForm__input}
                                    type="text"
                                    id="username"
                                    ref={userRef}
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
                                        userFocus && user && !validName
                                            ? s.instructions
                                            : s.offscreen
                                    }
                                >
                                    4 to 24 characters. <br />
                                    Must begin with a letter. <br />
                                    Letters, numbers, underscores, hyphens allowed.
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
                                    8 to 24 characters. <br />
                                    Must includ uppercase and lowercase letters, a number and a
                                    special character. <br />
                                    Allowed special characters:
                                    <span aria-label="exclamation mark">!</span>
                                    <span aria-label="dot mark">.</span>
                                    <span aria-label="at symbol">@</span>
                                    <span aria-label="hashtag">#</span>
                                    <span aria-label="dollar sign">$</span>
                                    <span aria-label="percent">%</span>
                                    <br />
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
                                    className={
                                        matchFocus && !validMatch ? s.instructions : s.offscreen
                                    }
                                >
                                    Must match the first password input field. <br />
                                    <br />
                                </p>
                            </div>

                            <button
                                className={s.registerForm__connect}
                                disabled={
                                    !validEmail || !validName || !validMatch || !validPwd
                                        ? true
                                        : false
                                }
                                type="submit"
                            >
                                Subscribe
                            </button>
                            {error && <p>{error}</p>}
                            <Link to="/login">Back to login page</Link>
                        </form>
                    </div>
                </section>
            )}
            {/* menu login username password display full css ? */}
            {/* menu subscribe username password display full css ? */}
        </>
    );
}
