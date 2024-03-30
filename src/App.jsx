import { Routes, Route } from "react-router-dom";

import Welcome from "./pages/welcome/welcome";
import Register from "./components/register/register";
import TestText from "./components/testText/testText";
import Login from "./components/login/login";
import Unauthorized from "./components/unauthorized";
import RequireAuth from "./components/requireAuth/requireAuth";
import Loaderfont from "./components/loaderfont/loaderfont";
import Settings from "./components/settings/settings";
import AllFontsPage from "./pages/allfontsPage/allFontsPage";
import FavoritesPage from "./pages/favoritesPage/favoritesPage";
import VariablePage from "./pages/variablePage/variablePage";

export default function App() {
    return (
        <>
            <Loaderfont />
            <Routes>
                {/* public routes */}
                <Route path="/" element={<Welcome />}></Route>
                <Route path="register" element={<Register />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="unauthorized" element={<Unauthorized />}></Route>

                {/* protected routes */}
                <Route element={<RequireAuth />}>
                    <Route path="favorites" element={<FavoritesPage />}></Route>
                    <Route path="fonttest" element={<TestText />}></Route>
                    <Route path="home" element={<AllFontsPage />}></Route>
                    <Route path="variable" element={<VariablePage />}></Route>
                    <Route path="settings" element={<Settings />}></Route>
                </Route>
                {/* catch all */}
                {/* <Route path="*" element={<Missing />}></Route> */}
            </Routes>
        </>
    );
}
