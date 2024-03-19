import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Welcome from "./pages/welcome";
import Register from "./components/register";
import TestText from "./components/testText";
import Login from "./components/login";
import Home from "./pages/home";

// Utilisation de createBrowserRouter pour créer l'instance du routeur
const router = createBrowserRouter([
    {
        path: "/",
        element: <Welcome />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/test",
        element: <TestText />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/home",
        element: <Home />,
    },
]);

export default function App() {
    const [fonts, setFonts] = useState([]);
    const [choosedFonts, setChoosedFonts] = useState([]);

    return (
        <>
            <RouterProvider router={router}>
                <TestText fonts={fonts} choosedFonts={choosedFonts} />
            </RouterProvider>
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
