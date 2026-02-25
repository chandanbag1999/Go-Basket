const ClearanceBanner = () => {
    return (
        <div className="px-4 lg:px-[268px] bg-gray-50 pt-6 pb-4">
            {/* Banner card */}
            <div
                className="relative flex flex-col items-center justify-center rounded-2xl overflow-hidden shadow-md py-6 px-6"
                style={{
                    minHeight: "110px",
                    background: "#FFD600",
                }}
            >
                {/* ── Polka-dot texture overlay ─────────────────────── */}
                <div
                    className="absolute inset-0 opacity-15"
                    style={{
                        backgroundImage: "radial-gradient(circle, #000 1.2px, transparent 1.2px)",
                        backgroundSize: "18px 18px",
                    }}
                />

                {/* ── Diamond decorations ────────────────────────────── */}
                {/* Left diamonds */}
                <svg className="absolute left-6 top-1/2 -translate-y-1/2 opacity-40" width="48" height="80" viewBox="0 0 48 80">
                    <rect x="4" y="16" width="16" height="16" rx="1" transform="rotate(45 12 24)" fill="none" stroke="#fff" strokeWidth="1.5" />
                    <rect x="4" y="48" width="16" height="16" rx="1" transform="rotate(45 12 56)" fill="none" stroke="#fff" strokeWidth="1.5" />
                </svg>
                {/* Right diamonds */}
                <svg className="absolute right-6 top-1/2 -translate-y-1/2 opacity-40" width="48" height="80" viewBox="0 0 48 80">
                    <rect x="28" y="16" width="16" height="16" rx="1" transform="rotate(45 36 24)" fill="none" stroke="#fff" strokeWidth="1.5" />
                    <rect x="28" y="48" width="16" height="16" rx="1" transform="rotate(45 36 56)" fill="none" stroke="#fff" strokeWidth="1.5" />
                </svg>

                {/* ── Sparkle / splatter decorations ────────────────── */}
                <span className="absolute text-2xl" style={{ left: "80px", top: "14px" }}>✦</span>
                <span className="absolute text-lg opacity-70" style={{ left: "72px", bottom: "14px" }}>💧</span>
                <span className="absolute text-2xl" style={{ right: "80px", top: "14px" }}>✦</span>
                <span className="absolute text-lg opacity-70" style={{ right: "72px", bottom: "14px" }}>💧</span>

                {/* ── Main headline ──────────────────────────────────── */}
                <h2
                    className="relative z-10 text-center font-black leading-tight w-full"
                    style={{
                        fontSize: "clamp(44px, 6.5vw, 82px)",
                        color: "#ffffff",
                        WebkitTextStroke: "4px #e91e8c",
                        textShadow: `
                            4px  4px 0   #c2185b,
                            8px  8px 0   #880e4f,
                            12px 12px 0  rgba(136,14,79,0.35),
                            0    0   24px rgba(255,255,255,0.6),
                            0    0   48px rgba(233,30,140,0.4)
                        `,
                        fontFamily: "'Arial Black', 'Impact', sans-serif",
                        letterSpacing: "0.05em",
                        paddingLeft: "38px",
                        paddingRight: "38px",
                        transform: "rotate(-1deg)",
                        filter: "drop-shadow(0 4px 12px rgba(233,30,140,0.35))",
                    }}
                >
                    Mega Clearance Sale
                </h2>

                {/* ── CTA + sub-text ─────────────────────────────────── */}
                <div className="relative z-10 flex flex-col items-center gap-1 mt-3">
                    <button
                        className="px-7 py-2 rounded-full text-white font-black shadow-lg transition-all hover:scale-105 active:scale-95"
                        style={{
                            fontSize: "14px",
                            background: "linear-gradient(135deg,#e53935,#b71c1c)",
                            letterSpacing: "0.02em",
                        }}
                    >
                        Shop Now
                    </button>
                    <p
                        className="font-bold text-gray-900"
                        style={{ fontSize: "11px", letterSpacing: "0.04em" }}
                    >
                        Until Stock Last
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ClearanceBanner;
