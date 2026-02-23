import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../store/slices/authSlice";
import LoginModal from "../components/auth/LoginModal";
import { useEffect } from "react";

/**
 * SignIn page — renders the LoginModal at /sign-in URL.
 * If user is already logged in, redirects to home.
 */
const SignIn = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    // If already logged in, redirect to home
    useEffect(() => {
        if (isLoggedIn) navigate("/", { replace: true });
    }, [isLoggedIn, navigate]);

    if (isLoggedIn) return null;

    return (
        <LoginModal onClose={() => navigate(-1)} />
    );
};

export default SignIn;
