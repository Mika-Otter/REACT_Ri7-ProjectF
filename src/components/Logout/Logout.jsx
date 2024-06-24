import React from "react";
import s from "./Logout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserId } from "../../features/authentificationSlice";

export default function Logout({ handleTransition }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  const handleLogout = () => {
    handleTransition();

    setTimeout(() => {
      navigate("/");
      setTimeout(() => {
        dispatch(clearUserId());
      }, 300);
    }, 300);
  };
  return (
    <>
      <div className={s.logout}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}
