import { createSlice } from "@reduxjs/toolkit";

// Load persisted auth from localStorage on startup
const token = localStorage.getItem("token");
const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")); }
    catch { return null; }
})();

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: user || null,       // { id, firstName, mobile, role }
        token: token || null,
        isLoggedIn: !!token,
    },
    reducers: {
        // Called after OTP verify (existing user) or profile setup (new user)
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isLoggedIn = true;
            // Persist to localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
        },
        // Update only the access token (after silent refresh)
        updateToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        // Called on logout
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});

export const { setCredentials, updateToken, logout } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectToken = (state) => state.auth.token;
export const selectUserRole = (state) => state.auth.user?.role || null;

export default authSlice.reducer;
