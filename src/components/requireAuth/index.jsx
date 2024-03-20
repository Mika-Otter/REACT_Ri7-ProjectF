import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RequireAuth() {
    const userId = useSelector((state) => state.auth.userId);
    const location = useLocation();

    console.log(userId);

    return userId === true ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
}
