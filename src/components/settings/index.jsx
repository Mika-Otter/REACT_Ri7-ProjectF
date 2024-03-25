import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import s from "./settings.module.scss";
import Folder from "../folder";
import axios from "../../app/api/axios";
import { setUserName } from "../../features/authSlice";
import { useDispatch } from "react-redux";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,15}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@?$%]).{8,24}$/;
// const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SETTING_URL = "http://localhost:8080/settings/update";

export default function Settings() {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.auth.username);
    const userId = useSelector((state) => state.auth.userId);
    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdBlur, setPwdBlur] = useState(false);

    const [newPwd, setNewPwd] = useState("");
    const [validNewPwd, setValidNewPwd] = useState(false);
    const [newPwdBlur, setNewPwdBlur] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchBlur, setMatchBlur] = useState(false);

    useEffect(() => {
        if (username) {
            setUser(username);
        }
    }, [username]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidNewPwd(PWD_REGEX.test(newPwd));
        const match = newPwd === matchPwd;
        setValidMatch(match);
    }, [pwd, newPwd, matchPwd]);

    const handleChangeName = async (e, userId, userName) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(user);

        if (!v1) {
            setValidName(false);
            return;
        }

        try {
            const res = await axios.post(SETTING_URL + "/name", { userId, userName });
            setSuccess("name");
            dispatch(setUserName(userName));
            return res.status === 200;
        } catch (err) {
            if (!err?.response) {
                setError(
                    "Sorry, we have actually a problem with our server connection... Try later."
                );
            } else if (err.response?.status === 409) {
                setError("Username already used");
            } else {
                setError("Impossible to change name", err.response.data);
            }
        }
    };

    const handleChangePassword = async (e, userId, pwd, newPwd) => {
        e.preventDefault();

        if (validMatch) {
            try {
                console.log("TOOOOOO");
                const res = await axios.post(SETTING_URL + "/pwd", { userId, pwd, newPwd });
                setSuccess(true);
                return res.status === 200;
            } catch (err) {
                if (!err?.response) {
                    setError(
                        "Sorry, we have actually a problem with our server connection... Try later."
                    );
                } else {
                    setError("Impossible to change password", err.response.data);
                }
            }
        }
    };

    return (
        <>
            <Folder />
            <section className={s.profil__section}>
                <div className={s.profil}>
                    <h1>Settings</h1>

                    <form
                        className={s.profil__user}
                        onSubmit={(e) => handleChangeName(e, userId, user)}
                        autoComplete="off"
                        id="usernameForm"
                    >
                        <h3>User Profil</h3>
                        <div className={s.profil__user__name}>
                            <label htmlFor="username">Name</label>
                            <input
                                type="text"
                                id="username"
                                required
                                placeholder="Enter an username"
                                name="username"
                                data-form-type="other"
                                autoComplete="off"
                                value={user}
                                onChange={(e) => {
                                    setUser(e.target.value);
                                }}
                            />
                            {success === "name" ? <p>Username changed</p> : null}
                            {error ? <p>{error}</p> : null}
                            {!validName ? (
                                <p className={s.error}>
                                    4 to 24 characters. Must begin with a letter. <br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                        <button type="submit" form="usernameForm">
                            Update profil
                        </button>
                    </form>
                    <h3>Change password</h3>
                    <form
                        className={s.profil__password}
                        autoComplete="off"
                        onSubmit={(e) => {
                            handleChangePassword(e, userId, pwd, matchPwd);
                        }}
                        id="passwordForm"
                    >
                        <div className={s.profil__password__old}>
                            <label htmlFor="oldPassword">Old password</label>
                            <input
                                type="password"
                                id="oldPassword"
                                name="oldPassword"
                                autoComplete="off"
                                required
                                onChange={(e) => {
                                    setPwd(e.target.value);
                                }}
                                onBlur={() => setPwdBlur(true)}
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                            />
                            <p
                                id="pwdnote"
                                className={pwdBlur && !validPwd ? s.instructions : s.offscreen}
                            >
                                This password is not valid !
                            </p>
                        </div>
                        <div className={s.profil__password__new}>
                            <label htmlFor="newPassword">New password</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                autoComplete="off"
                                required
                                onChange={(e) => {
                                    setNewPwd(e.target.value);
                                }}
                                onBlur={() => {
                                    if (newPwd.length > 0) setNewPwdBlur(true);
                                }}
                                aria-invalid={validNewPwd ? "false" : "true"}
                                aria-describedby="newpwdnote"
                            />
                            <p
                                id="newpwdnote"
                                className={
                                    newPwdBlur && !validNewPwd ? s.instructions : s.offscreen
                                }
                            >
                                This password is not valid !
                            </p>
                        </div>
                        <div className={s.profil__password__confirm}>
                            <label htmlFor="confirmPassword">Confirm new password</label>
                            <input
                                type="password"
                                id="matchPassword"
                                name="matchPassword"
                                autoComplete="off"
                                required
                                onChange={(e) => {
                                    setMatchPwd(e.target.value);
                                    handleChangePassword(e);
                                }}
                                onBlur={() => {
                                    if (matchPwd.length > 0) setMatchBlur(true);
                                }}
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="matchnote"
                            />
                            <p
                                id="matchnote"
                                className={matchBlur && !validMatch ? s.instructions : s.offscreen}
                            >
                                This password need to be the same of the precedent field !
                            </p>
                        </div>
                        <p></p>
                        <button type="submit" form="passwordForm">
                            Update password
                        </button>
                    </form>
                    <h3>Email preferences</h3>
                    <div className={s.email__preferences}>
                        <span>user.email</span>
                        <button type="button" className={s.manage}>
                            Manage
                        </button>
                    </div>
                    <h3>Custom</h3>
                    <div className={s.email__preferences}>
                        <label htmlFor="custonFont">Change the font :</label>
                        <select name="customfont" id="custonFont">
                            <option>Nacelle</option>
                            <option>Other</option>
                            <option>Last</option>
                        </select>
                    </div>
                </div>
            </section>
        </>
    );
}
