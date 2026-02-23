import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn, logout as logoutAction } from "./store/slices/authSlice";
import { logoutUser } from "./services/authApi";

// Pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import TrackOrder from "./pages/TrackOrder";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Components
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      // ignore — even if API fails, clear local state
    }
    dispatch(logoutAction());
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public Routes ─────────────────────────── */}
        <Route
          path="/"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
            />
          }
        />
        <Route path="/sign-in" element={<SignIn />} />

        {/* ── Customer Routes (login required, customer role) ── */}
        <Route element={<ProtectedRoute role="customer" />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId/track" element={<TrackOrder />} />
        </Route>

        {/* ── Any logged-in user can access profile ── */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* ── 404 ───────────────────────────────────── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;