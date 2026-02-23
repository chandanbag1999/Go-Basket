import axios from "axios";
import store from "../store/store";
import { setCredentials, logout } from "../store/slices/authSlice";

// create axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,   // send cookies (refresh token) with every request
    timeout: 10000,
});

// Request interceptor — attach access token from Redux store
api.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Response interceptor — handle token refresh on 401
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve(token);
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response.data,  // unwrap data
    async (error) => {
        const originalRequest = error.config;

        // If 401 and not already retrying — try refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            // Don't try to refresh if the failing request IS the refresh call
            if (originalRequest.url?.includes("/auth/refresh-token")) {
                store.dispatch(logout());
                return Promise.reject(error);
            }

            if (isRefreshing) {
                // Another refresh is in progress — queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call refresh endpoint (cookie sent automatically)
                const data = await api.post("/api/v1/auth/refresh-token");

                const newToken = data.token;
                const currentUser = store.getState().auth.user;

                // Update Redux + localStorage with new token
                store.dispatch(setCredentials({ token: newToken, user: currentUser }));

                // Process queued requests with new token
                processQueue(null, newToken);

                // Retry original request
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                processQueue(refreshError, null);
                store.dispatch(logout());
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // Non-401 errors — normalise message
        const message =
            error.response?.data?.message ||
            error.message ||
            "Something went wrong";
        return Promise.reject(new Error(message));
    }
);

export default api;

// ── Auth API calls ────────────────────────────────────────────────

// 1. Send OTP to mobile number
export const sendOtp = (mobile) =>
    api.post("/api/v1/auth/send-otp", { mobile });

// 2. Verify OTP — returns { isNewUser, token?, user? }
export const verifyOtp = (mobile, otp) =>
    api.post("/api/v1/auth/verify-otp", { mobile, otp });

// 3. Set up profile for new users — returns { token, user }
export const setupProfile = (mobile, firstName) =>
    api.post("/api/v1/auth/setup-profile", { mobile, firstName });

// 4. Refresh access token (uses httpOnly cookie)
export const refreshAccessToken = () =>
    api.post("/api/v1/auth/refresh-token");

// 5. Logout — invalidate refresh token
export const logoutUser = () =>
    api.post("/api/v1/auth/logout");

// 6. Get current user info
export const getMe = () =>
    api.get("/api/v1/auth/me");
