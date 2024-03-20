import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RequireAuth() {
    const userId = useSelector((state) => state.auth.userId);
    const location = useLocation();

    console.log(userId);

    return userId ? <Outlet /> : <Navigate to="/unauthorized" state={{ from: location }} replace />;
}
