import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import s from "./settings.module.scss";
import Folder from "../folder";
import axios from "../../app/api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,15}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@?$%]).{8,24}$/;
// const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SETTING_URL = "http://localhost:8080/settings/update";

export default function Settings() {
    const username = useSelector((state) => state.auth.username);
    const userId = useSelector((state) => state.auth.userId);
    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (username) {
            setUser(username);
        }
    }, [username]);

    const handleChangeName = async (e, userId, userName) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(user);

        if (!v1) {
            setValidName(false);
            return;
        }

        try {
            console.log("tteeest ", userId, userName);
            const res = await axios.post(SETTING_URL + "/name", { userId, userName });
            setSuccess(true);
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
                            {success ? <p>Username changed</p> : null}
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
                        <button type="submit">Update profil</button>
                    </form>
                    <h3>Change password</h3>
                    <form className={s.profil__password} method="post">
                        <div className={s.profil__password__old}>
                            <label htmlFor="oldPassword">Old password</label>
                            <input type="password" name="oldPassword" />
                        </div>
                        <div className={s.profil__password__new}>
                            <label htmlFor="newPassword">New password</label>
                            <input type="password" name="newPassword" />
                        </div>
                        <div className={s.profil__password__confirm}>
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input type="password" name="confirmPassword" />
                        </div>
                        <button type="submit">Update password</button>
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
