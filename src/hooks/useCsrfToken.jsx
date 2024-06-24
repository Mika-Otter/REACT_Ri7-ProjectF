import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCsrfToken } from "../features/tokenCsrfSlice";

export default function useCsrfToken() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const response = await axios.get("http://localhost:8080/getCSRFToken", {
          withCredentials: true,
        });
        dispatch(setCsrfToken(response.data.csrfToken));
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    }
    fetchCsrfToken();
  }, [dispatch]);
}
