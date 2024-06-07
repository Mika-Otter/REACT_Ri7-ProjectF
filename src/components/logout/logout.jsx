import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserId } from "../../features/authSlice";

import s from "./logout.module.scss";

export default function Logout() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearUserId());
        navigate("/");
    };
    return (
        <>
            <div className={s.logout}>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
}
