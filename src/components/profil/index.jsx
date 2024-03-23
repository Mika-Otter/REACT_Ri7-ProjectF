import React from "react";
import s from "./profil.module.scss";
import Folder from "../folder";

export default function Profil() {
    return (
        <>
            <Folder />
            <section>
                <h1>Accessibility</h1>
                <div className={s.profil}>
                    <h3>User Profil</h3>
                    <form className={s.profil__user} method="post">
                        <div className={s.profil__user__name}>
                            <label htmlFor="username">Name</label>
                            <input type="text" value="user.name" />
                        </div>
                        <div className={s.profil__user__email}>
                            <label htmlFor="email">Email address</label>
                            <input type="email" name="email" value="user.email" />
                        </div>
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
                        <button type="button">Manage</button>
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
