import { Routes, Route } from "react-router-dom";
import "../public/styles/global.scss";

import TestText from "./components/testText/testText";
import Login from "./components/Login/Login";
import Unauthorized from "./components/unauthorized";
import RequireAuth from "./components/requireAuth/requireAuth";
import Loaderfont from "./components/loaderfont/loaderfont";
import AllFontsPage from "./pages/allfontsPage/allFontsPage";
import FavoritesPage from "./pages/favoritesPage/favoritesPage";
import VariablePage from "./pages/variablePage/variablePage";
import SettingsPage from "./pages/settingsPage/settingsPage";
import Welcome from "./pages/Welcome/Welcome";

export default function App() {
  return (
    <>
      <Loaderfont />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Welcome />}></Route>
        {/* <Route path="register" element={<Register />}></Route> */}
        <Route path="login" element={<Login />}></Route>
        <Route path="unauthorized" element={<Unauthorized />}></Route>

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="favorites" element={<FavoritesPage />}></Route>
          <Route path="fonttest" element={<TestText />}></Route>
          <Route path="home" element={<AllFontsPage />}></Route>
          <Route path="variable" element={<VariablePage />}></Route>
          <Route path="settings" element={<SettingsPage />}></Route>
        </Route>
        {/* catch all */}
        {/* <Route path="*" element={<Missing />}></Route> */}
      </Routes>
    </>
  );
}
