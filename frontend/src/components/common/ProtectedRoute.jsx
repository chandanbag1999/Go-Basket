import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserRole } from "../../store/slices/authSlice";

/**
 * ProtectedRoute — wraps routes that require login and optionally a specific role.
 *
 * Usage:
 *   <Route element={<ProtectedRoute />}>           ← any logged-in user
 *   <Route element={<ProtectedRoute role="admin" />}>  ← admin only
 *   <Route element={<ProtectedRoute role={["customer", "admin"]} />}>  ← multiple roles
 */
const ProtectedRoute = ({ role, redirectTo = "/" }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userRole = useSelector(selectUserRole);

    // Not logged in → redirect to home
    if (!isLoggedIn) {
        return <Navigate to={redirectTo} replace />;
    }

    // Role check (if role prop is provided)
    if (role) {
        const allowedRoles = Array.isArray(role) ? role : [role];
        if (!allowedRoles.includes(userRole)) {
            return <Navigate to="/" replace />;
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;
