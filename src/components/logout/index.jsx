import React from "react";
import s from "./logout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearUserId } from "../../features/authSlice";

export default function Logout() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);

    const handleLogout = () => {
        dispatch(clearUserId());
        console.log(userId);
    };
    return (
        <>
            <div className={s.logout}>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
}
