import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingBasket, Search, AlignJustify, ShoppingCart, Zap, Clock, LogOut, User } from "lucide-react";
import { selectCurrentUser, selectIsLoggedIn } from "../../store/slices/authSlice";
import { selectCartCount } from "../../store/slices/cartSlice";

const Header = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState("quick");
    const [searchQuery, setSearchQuery] = useState("");
    const user = useSelector(selectCurrentUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const cartCount = useSelector(selectCartCount);

    return (
        <header className="w-full bg-[#0d7ab5]">

            {/* ── Desktop Row ─────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-2.5 lg:px-[268px]">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 shrink-0">
                    <div className="bg-red-500 rounded-lg p-1.5">
                        <ShoppingBasket size={18} className="text-white" />
                    </div>
                    <span className="text-white font-bold text-base sm:text-lg leading-none whitespace-nowrap">
                        Go<span className="text-yellow-300">Basket</span>
                    </span>
                </Link>

                {/* Quick / Scheduled Toggle */}
                <div className="hidden sm:flex items-center bg-[#0b6a9e] rounded-full p-0.5 shrink-0">
                    <button
                        onClick={() => setActiveTab("quick")}
                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === "quick"
                            ? "bg-white text-[#0d7ab5]"
                            : "text-white/70 hover:text-white"
                            }`}
                    >
                        <Zap size={11} />
                        Quick
                    </button>
                    <button
                        onClick={() => setActiveTab("scheduled")}
                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === "scheduled"
                            ? "bg-white text-[#0d7ab5]"
                            : "text-white/70 hover:text-white"
                            }`}
                    >
                        Scheduled
                    </button>
                </div>

                {/* Search Bar — desktop (lg+) */}
                <div className="hidden lg:flex flex-1 mx-6 max-w-md items-center bg-[#0b6a9e] rounded-full px-4 py-2 gap-2 min-w-0">
                    <Search size={16} className="text-white/50 shrink-0" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search In ${activeTab === "quick" ? "Quick" : "Scheduled"}`}
                        className="flex-1 bg-transparent text-white placeholder-white/50 text-sm outline-none min-w-0"
                    />
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-5 shrink-0">

                    {/* List/Menu icon */}
                    <button className="hidden sm:flex text-white/80 hover:text-white transition-colors">
                        <AlignJustify size={20} />
                    </button>

                    {/* Cart */}
                    <Link to="/cart" className="relative text-white/80 hover:text-white transition-colors">
                        <ShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-2 bg-yellow-400 text-[#0d7ab5] text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {cartCount > 99 ? "99+" : cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Sign In / User Profile */}
                    {isLoggedIn ? (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/profile"
                                className="flex items-center gap-1.5 text-white hover:text-white/90 transition-colors"
                            >
                                <User size={18} className="opacity-80" />
                                <span className="text-sm font-medium hidden sm:inline">
                                    {user?.firstName || "Account"}
                                </span>
                            </Link>
                            <button
                                onClick={onLogout}
                                className="hidden sm:flex items-center text-white/60 hover:text-white transition-colors ml-1"
                                title="Logout"
                            >
                                <LogOut size={15} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/sign-in"
                            className="flex items-center gap-1.5 text-white hover:text-white/90 transition-colors"
                        >
                            <User size={18} className="opacity-80" />
                            <span className="text-sm font-medium hidden sm:inline">Sign In</span>
                        </Link>
                    )}
                </div>
            </div>

            {/* ── Mobile Row 2: Search + Toggle ─────────────── */}
            <div className="lg:hidden px-4 pb-3 flex flex-col gap-2">
                {/* Search bar */}
                <div className="flex items-center bg-[#0b6a9e] rounded-full px-4 py-2.5 gap-2">
                    <Search size={15} className="text-white/50 shrink-0" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search In ${activeTab === "quick" ? "Quick" : "Scheduled"}`}
                        className="flex-1 bg-transparent text-white placeholder-white/50 text-sm outline-none"
                    />
                </div>

                {/* Toggle (xs only — sm+ has it in row 1) */}
                <div className="flex sm:hidden items-center bg-[#0b6a9e] rounded-full p-0.5 self-start">
                    <button
                        onClick={() => setActiveTab("quick")}
                        className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === "quick"
                            ? "bg-white text-[#0d7ab5]"
                            : "text-white/70 hover:text-white"
                            }`}
                    >
                        <Zap size={11} />
                        Quick
                    </button>
                    <button
                        onClick={() => setActiveTab("scheduled")}
                        className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === "scheduled"
                            ? "bg-white text-[#0d7ab5]"
                            : "text-white/70 hover:text-white"
                            }`}
                    >
                        Scheduled
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
