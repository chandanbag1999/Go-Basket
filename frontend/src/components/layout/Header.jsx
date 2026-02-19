import { useState } from "react";
import { ShoppingBasket, Search, AlignJustify, ShoppingCart, Zap, Clock } from "lucide-react";

const Header = ({ onLoginClick }) => {
    const [activeTab, setActiveTab] = useState("quick");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <header className="w-full bg-[#0d4f6e]">

            {/* ── Row 1: Logo | Toggle | Icons ─────────────────── */}
            <div className="flex items-center gap-3 px-4 pt-3 pb-2 md:px-6">

                {/* Logo */}
                <div className="flex items-center gap-2 shrink-0">
                    <div className="bg-red-500 rounded-md p-1.5">
                        <ShoppingBasket size={20} className="text-white" />
                    </div>
                    <span className="text-white font-bold text-base sm:text-lg leading-none">
                        Go<span className="text-yellow-400">Basket</span>
                    </span>
                </div>

                {/* Quick / Scheduled Toggle — hidden on xs, shown from sm */}
                <div className="hidden sm:flex items-center bg-[#0b3f58] rounded-full p-1 gap-1 shrink-0">
                    <button
                        onClick={() => setActiveTab("quick")}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${activeTab === "quick"
                                ? "bg-white text-[#0d4f6e]"
                                : "text-white/70 hover:text-white"
                            }`}
                    >
                        <Zap size={12} />
                        Quick
                    </button>
                    <button
                        onClick={() => setActiveTab("scheduled")}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${activeTab === "scheduled"
                                ? "bg-white text-[#0d4f6e]"
                                : "text-white/70 hover:text-white"
                            }`}
                    >
                        <Clock size={12} />
                        Scheduled
                    </button>
                </div>

                {/* Search Bar — visible on md+ in row-1, hidden on mobile (moves to row-2) */}
                <div className="hidden md:flex flex-1 items-center bg-[#0b3f58] rounded-full px-4 py-2 gap-2 min-w-0">
                    <Search size={15} className="text-white/50 shrink-0" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search In ${activeTab === "quick" ? "Quick" : "Scheduled"}`}
                        className="flex-1 bg-transparent text-white placeholder-white/50 text-sm outline-none min-w-0"
                    />
                </div>

                {/* Spacer on small screens */}
                <div className="flex-1 md:hidden" />

                {/* Right Icons */}
                <div className="flex items-center gap-3 shrink-0">
                    {/* List icon — hidden on mobile */}
                    <button className="hidden sm:block text-white/80 hover:text-white transition-colors">
                        <AlignJustify size={20} />
                    </button>

                    {/* Cart */}
                    <button className="relative text-white/80 hover:text-white transition-colors">
                        <ShoppingCart size={22} />
                        <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-[#0d4f6e] text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                            0
                        </span>
                    </button>

                    {/* User Avatar */}
                    <button
                        onClick={onLoginClick}
                        className="w-8 h-8 rounded-full bg-[#1a6a8a] hover:bg-[#1e7a9e] flex items-center justify-center text-white font-bold text-sm transition-colors"
                    >
                        M
                    </button>
                </div>
            </div>

            {/* ── Row 2 (mobile only): Search + Toggle ─────────── */}
            <div className="md:hidden px-4 pb-3 flex flex-col gap-2">

                {/* Search bar */}
                <div className="flex items-center bg-[#0b3f58] rounded-full px-4 py-2.5 gap-2">
                    <Search size={15} className="text-white/50 shrink-0" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search In ${activeTab === "quick" ? "Quick" : "Scheduled"}`}
                        className="flex-1 bg-transparent text-white placeholder-white/50 text-sm outline-none"
                    />
                </div>

                {/* Toggle tabs (only on xs where row-1 toggle is hidden) */}
                <div className="flex sm:hidden items-center bg-[#0b3f58] rounded-full p-1 gap-1 self-start">
                    <button
                        onClick={() => setActiveTab("quick")}
                        className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === "quick"
                                ? "bg-white text-[#0d4f6e]"
                                : "text-white/70 hover:text-white"
                            }`}
                    >
                        <Zap size={12} />
                        Quick
                    </button>
                    <button
                        onClick={() => setActiveTab("scheduled")}
                        className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === "scheduled"
                                ? "bg-white text-[#0d4f6e]"
                                : "text-white/70 hover:text-white"
                            }`}
                    >
                        <Clock size={12} />
                        Scheduled
                    </button>
                </div>
            </div>

        </header>
    );
};

export default Header;
