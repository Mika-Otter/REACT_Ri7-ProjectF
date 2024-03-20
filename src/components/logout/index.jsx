import React from "react";
import s from "./logout.module.scss";
import { useDispatch } from "react-redux";
import { clearUserId } from "../../features/authSlice";

export default function Logout() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUserId());
    };
    return (
        <>
            <div className={s.logout}>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
}
