import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Welcome from "./pages/welcome";
import Register from "./components/register";
import TestText from "./components/testText";
import Login from "./components/login";
import Home from "./pages/home";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Welcome />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/test" element={<TestText />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/home" element={<Home />}></Route>
            </Routes>
        </>
    );
}

// <TestText fonts={fonts} choosedFonts={choosedFonts} />
// <Folder
//     fonts={fonts}
//     setFonts={setFonts}
//     choosedFonts={choosedFonts}
//     setChoosedFonts={setChoosedFonts}
// />
// <VariableText />
// <Login />
