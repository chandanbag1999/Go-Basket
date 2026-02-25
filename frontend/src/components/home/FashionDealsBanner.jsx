const FashionDealsBanner = () => {
    return (
        <div className="px-4 lg:px-[268px] bg-gray-50 pt-8 pb-4">
            <div
                className="relative flex items-center rounded-2xl overflow-hidden shadow-md"
                style={{
                    minHeight: "140px",
                    background: "linear-gradient(110deg, #fdebd0 0%, #fad7a0 40%, #fdebd0 100%)",
                }}
            >
                {/* ── Cloud/fog accent in the middle-bottom ──────────── */}
                <div
                    className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(255,255,255,0.85) 0%, transparent 70%)",
                    }}
                />

                {/* ── LEFT: text ─────────────────────────────────────── */}
                <div className="relative z-10 flex flex-col gap-2 px-8 py-6 w-[55%]">
                    <h2
                        className="font-black text-gray-900 leading-tight whitespace-nowrap"
                        style={{
                            fontSize: "clamp(24px, 3vw, 38px)",
                            textShadow: "0 2px 8px rgba(0,0,0,0.12)",
                            letterSpacing: "-0.01em",
                        }}
                    >
                        Jaw Dropping Deals On Fashion
                    </h2>
                    <p className="font-black text-gray-900" style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}>
                        From <span style={{ fontSize: "clamp(22px, 2.6vw, 32px)", color: "#c62828" }}>₹74</span>
                    </p>
                    <button
                        className="self-start mt-1 px-6 py-2 rounded-full text-white font-bold shadow-md transition-all hover:scale-105 active:scale-95"
                        style={{ fontSize: "14px", background: "linear-gradient(135deg,#e53935,#b71c1c)" }}
                    >
                        Shop Now
                    </button>
                </div>

                {/* ── CENTRE: CSS model silhouettes ──────────────────── */}
                <div className="relative z-10 flex items-end justify-center flex-1 gap-1 self-stretch">
                    {/* Male model — white formal shirt */}
                    <div className="flex flex-col items-center justify-end h-full pb-0">
                        {/* head */}
                        <div className="rounded-full border" style={{ width: "30px", height: "34px", backgroundColor: "#c8a068", borderColor: "#b8894a" }} />
                        {/* torso */}
                        <div className="rounded-t-lg relative overflow-visible" style={{ width: "54px", height: "70px", background: "#f5f5f5" }}>
                            {/* collar open */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gray-300" />
                            <div className="absolute" style={{ left: "8px", top: "4px", width: "10px", height: "14px", background: "#e0e0e0", borderRadius: "0 0 0 6px" }} />
                            <div className="absolute" style={{ right: "8px", top: "4px", width: "10px", height: "14px", background: "#e0e0e0", borderRadius: "0 0 6px 0" }} />
                            {/* sleeves */}
                            <div className="absolute rounded-l-full" style={{ width: "12px", height: "30px", top: "6px", left: "-10px", background: "#f5f5f5" }} />
                            <div className="absolute rounded-r-full" style={{ width: "12px", height: "30px", top: "6px", right: "-10px", background: "#f5f5f5" }} />
                        </div>
                        {/* legs/pants */}
                        <div style={{ width: "54px", height: "30px", background: "#2c3e50", borderRadius: "0 0 4px 4px" }} />
                    </div>

                    {/* Female model — teal printed dress */}
                    <div className="flex flex-col items-center justify-end h-full pb-0">
                        {/* head */}
                        <div className="rounded-full border" style={{ width: "28px", height: "32px", backgroundColor: "#c8a068", borderColor: "#b8894a" }} />
                        {/* hair */}
                        <div style={{ width: "34px", height: "14px", background: "#1a0a00", borderRadius: "8px 8px 0 0", marginTop: "-10px", marginBottom: "10px" }} />
                        {/* dress - fitted top + flared skirt */}
                        <div className="relative overflow-visible flex flex-col items-center">
                            {/* bodice */}
                            <div className="relative overflow-hidden" style={{ width: "46px", height: "42px", background: "#1a4a5c" }}>
                                <div
                                    className="absolute inset-0 opacity-40"
                                    style={{ backgroundImage: "radial-gradient(circle, #c8e6c9 1px, transparent 1px)", backgroundSize: "6px 6px" }}
                                />
                                <div className="absolute rounded-l-full" style={{ width: "10px", height: "20px", top: "4px", left: "-8px", background: "#1a4a5c" }} />
                                <div className="absolute rounded-r-full" style={{ width: "10px", height: "20px", top: "4px", right: "-8px", background: "#1a4a5c" }} />
                            </div>
                            {/* skirt flare */}
                            <div
                                className="relative overflow-hidden"
                                style={{
                                    width: "68px", height: "40px",
                                    background: "#1a4a5c",
                                    clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
                                }}
                            >
                                <div
                                    className="absolute inset-0 opacity-40"
                                    style={{ backgroundImage: "radial-gradient(circle, #c8e6c9 1px, transparent 1px)", backgroundSize: "6px 6px" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Fashion Spotlight Sale badge ────────────── */}
                <div className="relative z-10 flex items-center justify-center px-8 shrink-0">
                    <div
                        className="relative flex flex-col items-center justify-center rounded-full"
                        style={{
                            width: "120px",
                            height: "120px",
                            background: "radial-gradient(circle at 40% 35%, #e8f5e9, #1a3a4a)",
                            border: "5px solid #1a3a4a",
                            boxShadow: "0 0 0 3px #c8a84b, 0 4px 16px rgba(0,0,0,0.28)",
                        }}
                    >
                        {/* Compass star at top */}
                        <span className="absolute font-black text-yellow-400" style={{ fontSize: "16px", top: "5px", lineHeight: 1 }}>✦</span>

                        {/* FASHION */}
                        <span className="font-black uppercase text-center leading-none" style={{ fontSize: "9px", color: "#fff", letterSpacing: "0.18em", marginTop: "18px" }}>FASHION</span>

                        {/* SPOTLIGHT */}
                        <span className="font-black uppercase text-center leading-none" style={{ fontSize: "9px", color: "#fff", letterSpacing: "0.12em" }}>SPOTLIGHT</span>

                        {/* clothing icons */}
                        <div className="flex gap-1 my-1">
                            <span style={{ fontSize: "24px" }}>👔</span>
                            <span style={{ fontSize: "24px" }}>👗</span>
                        </div>

                        {/* SALE */}
                        <span className="font-black uppercase text-center leading-none" style={{ fontSize: "11px", color: "#FFD600", letterSpacing: "0.2em", marginBottom: "8px" }}>SALE</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FashionDealsBanner;
