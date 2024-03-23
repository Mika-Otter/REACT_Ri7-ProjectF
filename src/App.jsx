import { Routes, Route } from "react-router-dom";

import Welcome from "./pages/welcome";
import Register from "./components/register";
import TestText from "./components/testText";
import Login from "./components/login";
import Home from "./pages/home";
import Unauthorized from "./components/unauthorized";
import RequireAuth from "./components/requireAuth";

export default function App() {
    return (
        <>
            <Routes>
                {/* public routes */}
                <Route path="/" element={<Welcome />}></Route>
                <Route path="register" element={<Register />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="unauthorized" element={<Unauthorized />}></Route>

                {/* protected routes */}
                <Route element={<RequireAuth />}>
                    <Route path="fonttest" element={<TestText />}></Route>
                    <Route path="home" element={<Home />}></Route>
                </Route>
                {/* catch all */}
                {/* <Route path="*" element={<Missing />}></Route> */}
            </Routes>
        </>
    );
}
