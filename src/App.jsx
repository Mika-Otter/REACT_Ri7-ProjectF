import React, { useState } from "react";
import "../public/styles/global.scss";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import TestText from "./components/testText/testText";
import Unauthorized from "./components/unauthorized";
import RequireAuth from "./components/requireAuth/requireAuth";
import Loaderfont from "./components/loaderfont/loaderfont";
import AllFontsPage from "./pages/AllfontsPage/AllFontsPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import VariablePage from "./pages/VariablePage/VariablePage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import Welcome from "./pages/Welcome/Welcome";
import TransitionLayout from "./components/TransitionLayout/TransitionLayout";
import Loader from "./components/Loader/Loader";

export default function App() {
  const [isTransition, setIsTransition] = useState(false);
  const handleTransition = () => {
    setIsTransition((prev) => !prev);
  };

  return (
    <>
      <Loader />
      <Loaderfont />
      <TransitionLayout isTransition={isTransition} />
      <Routes>
        {/* public routes */}
        <Route
          path="/"
          element={<Welcome handleTransition={handleTransition} />}
        ></Route>
        <Route path="404" element={<Unauthorized />}></Route>

        {/* protected routes */}
        <Route element={<RequireAuth handleTransition={handleTransition} />}>
          <Route path="favorites" element={<FavoritesPage />}></Route>
          <Route path="fonttest" element={<TestText />}></Route>
          <Route path="home" element={<AllFontsPage />}></Route>
          <Route path="variable" element={<VariablePage />}></Route>
          <Route path="settings" element={<SettingsPage />}></Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}
