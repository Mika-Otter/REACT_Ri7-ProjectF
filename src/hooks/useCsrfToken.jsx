import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useCsrfToken() {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const response = await axios.get("http://localhost:8080/getCSRFToken", {
          withCredentials: true,
        });
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    }
    fetchCsrfToken();
  }, []);

  return csrfToken;
}
