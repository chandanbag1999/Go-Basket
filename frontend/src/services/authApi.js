import axios from "axios";

// create axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
    headers: { "Content-Type": "application/json" },
    timeout: 10000, // 10s timeout
});

// Request interceptor — automatically attach JWT if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Response interceptor — unwrap data, normalise errors
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message =
            error.response?.data?.message ||
            error.message ||
            "Something went wrong";
        return Promise.reject(new Error(message));
    }
);

export default api;

// ── Auth API calls ────────────────────────────────────────────────────────────

// 1. Send OTP to mobile number
export const sendOtp = (mobile) =>
    api.post("/api/v1/auth/send-otp", { mobile });

// 2. Verify OTP — returns { isNewUser, token?, user? }
export const verifyOtp = (mobile, otp) =>
    api.post("/api/v1/auth/verify-otp", { mobile, otp });

// 3. Set up profile for new users — returns { token, user }
export const setupProfile = (mobile, firstName) =>
    api.post("/api/v1/auth/set-up-profile", { mobile, firstName });
