const PromoBanner = () => {
    /* Page bg colour — used for the scallop "bite" colour */
    const pageBg = "#f9fafb";
    const scallop = {
        r: 8,    /* radius of each scallop bump in px */
        gap: 18, /* spacing between bumps in px */
    };

    const topScallop = {
        position: "absolute", top: 0, left: 0, right: 0,
        height: `${scallop.r + 2}px`, zIndex: 30, pointerEvents: "none",
        background: `radial-gradient(circle at 50% 0%, transparent ${scallop.r}px, ${pageBg} ${scallop.r}px)`,
        backgroundSize: `${scallop.gap}px ${scallop.r + 2}px`,
        backgroundRepeat: "repeat-x",
    };
    const bottomScallop = {
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: `${scallop.r + 2}px`, zIndex: 30, pointerEvents: "none",
        background: `radial-gradient(circle at 50% 100%, transparent ${scallop.r}px, ${pageBg} ${scallop.r}px)`,
        backgroundSize: `${scallop.gap}px ${scallop.r + 2}px`,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "bottom",
    };
    const leftScallop = {
        position: "absolute", top: 0, bottom: 0, left: 0,
        width: `${scallop.r + 2}px`, zIndex: 30, pointerEvents: "none",
        background: `radial-gradient(circle at 0% 50%, transparent ${scallop.r}px, ${pageBg} ${scallop.r}px)`,
        backgroundSize: `${scallop.r + 2}px ${scallop.gap}px`,
        backgroundRepeat: "repeat-y",
    };
    const rightScallop = {
        position: "absolute", top: 0, bottom: 0, right: 0,
        width: `${scallop.r + 2}px`, zIndex: 30, pointerEvents: "none",
        background: `radial-gradient(circle at 100% 50%, transparent ${scallop.r}px, ${pageBg} ${scallop.r}px)`,
        backgroundSize: `${scallop.r + 2}px ${scallop.gap}px`,
        backgroundRepeat: "repeat-y",
        backgroundPosition: "right",
    };

    return (
        <div className="px-4 lg:px-[268px] pt-8 pb-3 bg-gray-50">
            <div
                className="relative flex items-stretch shadow-md"
                style={{ minHeight: "222px" }}
            >
                {/* Golden background — no border-radius, scallops handle the edge */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(110deg, #f9d84a 0%, #f5a623 45%, #f9c621 100%)",
                    }}
                />

                {/* ── 4-sided scalloped edge overlays ─────────────────── */}
                <div style={topScallop} />
                <div style={bottomScallop} />
                <div style={leftScallop} />
                <div style={rightScallop} />

                {/* ── LEFT: MEGA LOOT DEALS badge — 96px margin ──────── */}
                <div
                    className="relative z-10 flex items-center justify-center shrink-0"
                    style={{ paddingLeft: "96px", paddingRight: "28px" }}
                >
                    <div
                        className="relative flex flex-col items-center justify-center rounded-full shadow-xl border-4 border-yellow-300/50"
                        style={{
                            width: "136px",
                            height: "136px",
                            background: "radial-gradient(circle at 38% 30%, #ef5350, #b71c1c 70%, #7f0000)",
                        }}
                    >
                        <span className="absolute text-2xl drop-shadow-md" style={{ top: "-8px", left: "-6px" }}>🎲</span>
                        <span className="absolute text-2xl drop-shadow-md" style={{ top: "-8px", right: "-6px" }}>🎲</span>

                        <span className="font-black uppercase leading-none"
                            style={{ fontSize: "11px", color: "#fff", letterSpacing: "0.3em", marginTop: "14px" }}>
                            MEGA
                        </span>
                        <span className="font-black uppercase leading-none"
                            style={{
                                fontSize: "40px", color: "#FFD600",
                                WebkitTextStroke: "2px #e65100",
                                textShadow: "0 3px 0 #e65100, 0 5px 0 #bf360c, 0 2px 8px rgba(0,0,0,0.45)",
                                letterSpacing: "0.04em",
                            }}>
                            LOOT
                        </span>
                        <span className="font-black uppercase leading-none"
                            style={{
                                fontSize: "30px", color: "#FFD600",
                                WebkitTextStroke: "2px #e65100",
                                textShadow: "0 2px 0 #e65100, 0 4px 0 #bf360c, 0 1px 8px rgba(0,0,0,0.4)",
                                letterSpacing: "0.06em", marginBottom: "10px",
                            }}>
                            DEALS
                        </span>
                    </div>
                </div>

                {/* ── MIDDLE: offer text ──────────────────────────────── */}
                <div className="relative z-10 flex flex-col items-center justify-center gap-3 flex-1 py-6 text-center">
                    <p className="font-black leading-none"
                        style={{
                            fontSize: "48px", color: "#c62828",
                            textShadow: "0 2px 8px rgba(198,40,40,0.18)",
                            animation: "promoGlow 2.4s ease-in-out infinite",
                        }}>
                        Flat ₹50 Off
                    </p>
                    <p className="font-semibold text-gray-800" style={{ fontSize: "16px" }}>
                        Min. Order Value ₹249
                    </p>
                    <button
                        className="px-9 py-2.5 rounded-full text-white font-bold shadow-md transition-all hover:scale-105 active:scale-95"
                        style={{ fontSize: "15px", background: "linear-gradient(135deg,#e53935,#b71c1c)" }}>
                        Shop Now
                    </button>
                </div>

                {/* ── DASHED DIVIDER ─────────────────────────────────── */}
                <div className="relative z-10 flex items-stretch py-0 px-2 shrink-0">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full" style={{ backgroundColor: pageBg }} />
                    <div className="w-[1.5px] self-stretch"
                        style={{ background: "repeating-linear-gradient(to bottom,#9a6f00 0px,#9a6f00 7px,transparent 7px,transparent 14px)" }} />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full" style={{ backgroundColor: pageBg }} />
                </div>

                {/* ── RIGHT: coupon code — 96px margin ───────────────── */}
                <div
                    className="relative z-10 flex flex-col items-center justify-center shrink-0 gap-2"
                    style={{ paddingRight: "96px", paddingLeft: "28px" }}
                >
                    <span className="font-semibold text-gray-800 uppercase tracking-wide" style={{ fontSize: "13px" }}>
                        Coupon Code:
                    </span>
                    <div className="rounded-lg bg-white/70 px-6 py-2" style={{ border: "2.5px solid #c62828" }}>
                        <span className="font-black text-gray-900 tracking-widest" style={{ fontSize: "26px" }}>
                            DEAL50
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromoBanner;
