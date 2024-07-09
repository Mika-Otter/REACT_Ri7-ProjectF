import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Menu from "../Menu/Menu";

export default function RequireAuth({ handleTransition }) {
  const userId = useSelector((state) => state.auth.userId);
  const location = useLocation();

  return userId ? (
    <>
      <Menu handleTransition={handleTransition} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/404" state={{ from: location }} replace />
  );
}
