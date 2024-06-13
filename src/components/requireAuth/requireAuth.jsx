import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Menu from "../Menu/Menu";

export default function RequireAuth() {
  const userId = useSelector((state) => state.auth.userId);
  const location = useLocation();

  return userId ? (
    <>
      <Menu />
      <Outlet />
    </>
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
}
