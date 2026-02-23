import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Phone } from "lucide-react";
import Header from "../components/layout/Header";

const Profile = () => {
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-[#0d4f6e] flex items-center justify-center text-white text-3xl font-bold">
                    {user?.firstName?.[0]?.toUpperCase() || "U"}
                </div>

                {/* Info card */}
                <div className="bg-white rounded-2xl shadow-sm w-full max-w-sm p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <User size={18} className="text-gray-400" />
                        <div>
                            <p className="text-xs text-gray-400">Name</p>
                            <p className="text-sm font-semibold text-gray-800">{user?.firstName || "—"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone size={18} className="text-gray-400" />
                        <div>
                            <p className="text-xs text-gray-400">Mobile</p>
                            <p className="text-sm font-semibold text-gray-800">+91-{user?.mobile || "—"}</p>
                        </div>
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700 font-semibold text-sm transition-colors"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </main>
        </div>
    );
};

export default Profile;
