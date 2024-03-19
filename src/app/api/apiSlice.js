import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/fonts/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 403) {
        console.log("sending refresh token");
        // send refresh token to get new acces token
        const refreshResult = await baseQuery("/refresh");
    }
};
