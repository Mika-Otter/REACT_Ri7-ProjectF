import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserId, setUserName } from "../features/authentificationSlice";
import { setCsrfToken } from "../features/tokenCsrfSlice";
import axios from "../app/api/axios";

export const useLogin = ({ setError, handleTransition }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputsConnect, setInputsConnect] = useState({
    email: "",
    password: "",
  });

  const csrfToken = useSelector((state) => state.csrf.csrfToken);

  const successLoginUser = (userData) => {
    dispatch(setUserId(userData.id));
    dispatch(setUserName(userData.username));
  };

  const handleChangeInputs = (e) => {
    setInputsConnect((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/authentification/login", inputsConnect, {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        withCredentials: true,
      });
      setCsrfToken(res.data.csrfToken);
      localStorage.setItem("token", res.data.token);
      successLoginUser(res.data);
      handleTransition();
      setTimeout(() => {
        navigate("/home");
      }, 500);
    } catch (err) {
      if (err.response) {
        setError(
          err.response.data.message ||
            "Shortest password is 6 characters or error occurred while processing your request."
        );
      } else if (err.request) {
        setError("Whoops... The server is not responding. Try again later.");
      } else {
        setError("An error occurred while processing your request.");
      }
    }
  };

  return { handleChangeInputs, handleSubmitLogin };
};
