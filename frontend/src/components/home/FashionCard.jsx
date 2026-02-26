import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ── 6 cards total → 2 pages of 3 ──────────────────────────── */
const allCards = [
    {
        headline: "Easy Fits.\nSharp Looks",
        sub: "From ₹99",
        bg: "linear-gradient(130deg,#fdf3e7 0%,#fde8c8 50%,#f9d8a0 100%)",
        badge: { icon: "👔", label: "FASHION\nSPOTLIGHT", sub: "SALE", bg: "#fbc02d" },
        shirtColor: "#1a1a1a", stripe: true, skin: "#c8a068",
    },
    {
        headline: "Active Wear.\nBold Style",
        sub: "From ₹149",
        bg: "linear-gradient(130deg,#e8f5e9 0%,#c8e6c9 50%,#a5d6a7 100%)",
        badge: { icon: "🏃", label: "SPORTS\nESSENTIALS", sub: "SALE", bg: "#43a047" },
        shirtColor: "#1565c0", stripe: false, skin: "#8d5524",
    },
    {
        headline: "Office Wear.\nPro Vibes",
        sub: "From ₹299",
        bg: "linear-gradient(130deg,#e3f2fd 0%,#bbdefb 50%,#90caf9 100%)",
        badge: { icon: "💼", label: "FORMAL\nCOLLECTION", sub: "NEW", bg: "#1e88e5" },
        shirtColor: "#7aad78", stripe: false, skin: "#c8a068",
    },
    {
        headline: "Street Style.\nOwn The Look",
        sub: "From ₹199",
        bg: "linear-gradient(130deg,#fce4ec 0%,#f8bbd9 50%,#f48fb1 100%)",
        badge: { icon: "🧢", label: "STREET\nWEAR", sub: "HOT", bg: "#e91e63" },
        shirtColor: "#4a148c", stripe: true, skin: "#c8a068",
    },
    {
        headline: "Stay Cool.\nLook Great",
        sub: "From ₹129",
        bg: "linear-gradient(130deg,#e0f7fa 0%,#b2ebf2 50%,#80deea 100%)",
        badge: { icon: "🌊", label: "SUMMER\nVIBES", sub: "NEW", bg: "#00acc1" },
        shirtColor: "#006064", stripe: false, skin: "#8d5524",
    },
    {
        headline: "Be Bold.\nBe You",
        sub: "From ₹249",
        bg: "linear-gradient(130deg,#fff8e1 0%,#ffecb3 50%,#ffe082 100%)",
        badge: { icon: "⭐", label: "TRENDING\nNOW", sub: "HOT", bg: "#f9a825" },
        shirtColor: "#bf360c", stripe: true, skin: "#c8a068",
    },
];

/* ── Mini model silhouette ─────────────────────────────────── */
const Model = ({ color, stripe, skin, size = 1 }) => {
    const w = Math.round(44 * size);
    const h = Math.round(56 * size);
    const hw = Math.round(22 * size);
    const hh = Math.round(26 * size);
    return (
        <div className="flex flex-col items-center">
            <div
                className="rounded-full border"
                style={{ width: hw, height: hh, backgroundColor: skin, borderColor: "#b8894a" }}
            />
            <div
                className="rounded-t-lg relative overflow-visible"
                style={{ width: w, height: h, background: color }}
            >
                {stripe && (
                    <div
                        className="absolute inset-x-1 bottom-2 h-4 rounded-sm opacity-50"
                        style={{ background: "repeating-linear-gradient(45deg,#d4a04a 0px,#d4a04a 3px,transparent 3px,transparent 7px)" }}
                    />
                )}
                <div className="absolute rounded-l-full" style={{ width: Math.round(10 * size), height: Math.round(26 * size), top: Math.round(4 * size), left: -Math.round(8 * size), background: color }} />
                <div className="absolute rounded-r-full" style={{ width: Math.round(10 * size), height: Math.round(26 * size), top: Math.round(4 * size), right: -Math.round(8 * size), background: color }} />
            </div>
        </div>
    );
};

/* ── Single Card ──────────────────────────────────────────── */
const Card = ({ card }) => (
    <div
        className="relative flex flex-col justify-between rounded-2xl overflow-hidden shadow-md flex-1"
        style={{ minHeight: "200px", background: card.bg }}
    >
        {/* Badge */}
        <div
            className="absolute top-3 right-3 z-20 flex flex-col items-center justify-center rounded-full border-4 border-white shadow-lg"
            style={{ width: "62px", height: "62px", background: `radial-gradient(circle at 40% 35%, #fffde7, ${card.badge.bg})` }}
        >
            <span className="text-lg leading-none">{card.badge.icon}</span>
            <span className="font-black text-gray-900 uppercase leading-tight text-center" style={{ fontSize: "5.5px", whiteSpace: "pre-line" }}>{card.badge.label}</span>
            <span className="font-black uppercase leading-none" style={{ fontSize: "6px", color: "#c62828" }}>{card.badge.sub}</span>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2 px-5 pt-5 pb-3 z-10">
            <h3 className="font-black text-gray-900 leading-tight" style={{ fontSize: "15px", whiteSpace: "pre-line" }}>{card.headline}</h3>
            <p className="font-bold text-gray-800" style={{ fontSize: "13px" }}>{card.sub}</p>
            <button
                className="self-start px-4 py-1.5 rounded-full text-white font-bold shadow transition-all hover:scale-105 active:scale-95"
                style={{ fontSize: "11px", background: "linear-gradient(135deg,#e53935,#b71c1c)" }}
            >Shop Now</button>
        </div>

        {/* Models */}
        <div className="flex justify-end items-end px-3 pb-0 gap-2">
            <Model color={card.shirtColor} stripe={card.stripe} skin={card.skin} size={0.85} />
            <Model color={card.shirtColor} stripe={false} skin={card.skin} size={1} />
        </div>
    </div>
);

/* ── Arrow button ─────────────────────────────────────────── */
const ArrowBtn = ({ dir, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        aria-label={dir === "left" ? "Previous" : "Next"}
        className="group/btn flex items-center justify-center rounded-full border-2 border-blue-200 bg-white shadow-md
                   transition-all duration-300 hover:bg-blue-500 hover:border-blue-500 hover:shadow-lg hover:scale-110
                   disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white"
        style={{ width: "30px", height: "30px" }}
    >
        {dir === "left"
            ? <ChevronLeft size={16} className="text-blue-400 group-hover/btn:text-white transition-colors" />
            : <ChevronRight size={16} className="text-blue-400 group-hover/btn:text-white transition-colors" />
        }
    </button>
);

/* ── Dot indicator ────────────────────────────────────────── */
const Dots = ({ total, active, onDot }) => (
    <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
            <button
                key={i}
                onClick={() => onDot(i)}
                className="rounded-full transition-all duration-300"
                style={{
                    width: i === active ? "22px" : "10px",
                    height: "10px",
                    background: i === active ? "#2196f3" : "#bbdefb",
                }}
                aria-label={`Go to page ${i + 1}`}
            />
        ))}
    </div>
);

/* ── Carousel wrapper ─────────────────────────────────────── */
const FashionCard = ({ cards = allCards, renderCard = (c, key) => <Card key={key} card={c} />, cardsPerPage = 3, showDots = true }) => {
    const totalPages = Math.ceil(cards.length / cardsPerPage);
    const AUTO_INTERVAL = 3500;
    const [page, setPage] = useState(0);
    const [animDir, setAnimDir] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const timerRef = useRef(null);

    const goTo = useCallback((next, dir) => {
        if (isAnimating) return;
        setAnimDir(dir);
        setIsAnimating(true);
        setTimeout(() => {
            setPage(next);
            setIsAnimating(false);
        }, 350);
    }, [isAnimating]);

    const prev = () => {
        const next = (page - 1 + totalPages) % totalPages;
        goTo(next, "right");
    };
    const next = useCallback(() => {
        const nextPage = (page + 1) % totalPages;
        goTo(nextPage, "left");
    }, [page, goTo, totalPages]);

    /* auto-slide */
    useEffect(() => {
        timerRef.current = setInterval(next, AUTO_INTERVAL);
        return () => clearInterval(timerRef.current);
    }, [next]);

    const visibleCards = cards.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage);

    return (
        <div className="px-4 lg:px-[268px] bg-gray-50 pb-6" style={{ paddingTop: "38px" }}>
            {/* Cards row — group enables CSS hover-reveal of arrows */}
            <div className="relative group">
                {/* Left arrow — hidden until card row is hovered */}
                <div className="absolute left-[38px] top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowBtn dir="left" onClick={prev} />
                </div>

                {/* Sliding cards */}
                <div
                    className="flex gap-4"
                    style={{
                        opacity: isAnimating ? 0 : 1,
                        transform: isAnimating
                            ? `translateX(${animDir === "left" ? "-24px" : "24px"})`
                            : "translateX(0)",
                        transition: "opacity 0.35s ease, transform 0.35s ease",
                    }}
                >
                    {visibleCards.map((card, i) => renderCard(card, `${page}-${i}`))}
                </div>

                {/* Right arrow — hidden until card row is hovered */}
                <div className="absolute right-[38px] top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowBtn dir="right" onClick={next} />
                </div>
            </div>

            {/* Dots — hidden when showDots=false */}
            {showDots && (
                <div className="flex justify-center mt-4">
                    <Dots total={totalPages} active={page} onDot={(i) => goTo(i, i > page ? "left" : "right")} />
                </div>
            )}
        </div>
    );
};

export default FashionCard;
