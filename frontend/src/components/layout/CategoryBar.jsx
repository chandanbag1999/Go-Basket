import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ── Category data — 2-3 rotating emojis per circle ───────────── */
const categories = [
    { name: "Fashion", icons: ["👗", "👠", "👜"], bg: "#FFF0E6" },
    { name: "Happy Hour Coupon", icons: ["🎉", "🎁", "🏷️"], bg: "#FFF8E1" },
    { name: "Smartphone Deals", icons: ["📱", "💻", "🎧"], bg: "#E8F5E9" },
    { name: "Home & Lifestyle", icons: ["🏠", "🛋️", "🪴"], bg: "#E3F2FD" },
    { name: "Electronics", icons: ["🖥️", "📷", "⌚"], bg: "#FFF3E0" },
    { name: "Groceries", icons: ["🛒", "🥦", "🍎"], bg: "#E8F5E9" },
    { name: "99 To 999 Store", icons: ["🏷️", "💰", "🎯"], bg: "#FCE4EC" },
    { name: "Globe", icons: ["🌍", "✈️", "🗺️"], bg: "#E0F7FA" },
];

/* ── Circle with 2-3 icons sliding in/out vertically ──────────── */
const RotatingIcon = ({ icons, bg }) => {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setIdx((p) => (p + 1) % icons.length), 2400);
        return () => clearInterval(t);
    }, [icons.length]);

    return (
        <div
            className="w-11 h-11 rounded-full shrink-0 shadow-sm overflow-hidden relative"
            style={{ backgroundColor: bg }}
        >
            {icons.map((emoji, i) => {
                const isCurrent = i === idx;
                const isPrev = i === (idx - 1 + icons.length) % icons.length;
                return (
                    <span
                        key={i}
                        className="absolute inset-0 flex items-center justify-center text-xl"
                        style={{
                            transition: "opacity 0.5s ease, transform 0.5s ease",
                            opacity: isCurrent ? 1 : 0,
                            transform: isCurrent
                                ? "translateY(0) scale(1)"
                                : isPrev
                                    ? "translateY(-22px) scale(0.65)"
                                    : "translateY(22px) scale(0.65)",
                        }}
                    >
                        {emoji}
                    </span>
                );
            })}
        </div>
    );
};

/* ── CategoryBar ──────────────────────────────────────────────── */
const CategoryBar = () => {
    const scrollRef = useRef(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(true);

    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanLeft(el.scrollLeft > 2);
        setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    };

    useEffect(() => {
        checkScroll();
        const el = scrollRef.current;
        el?.addEventListener("scroll", checkScroll, { passive: true });
        window.addEventListener("resize", checkScroll);
        return () => {
            el?.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, []);

    const slide = (dir) =>
        scrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });

    return (
        <div className="w-full bg-white border-b border-gray-200">
            {/* ── Content zone — same 268px side margins as header ── */}
            <div className="px-4 lg:px-[268px] py-2.5">
                {/* Flex row: [arrow] [scroll list] [arrow] */}
                <div className="flex items-center gap-2">

                    {/* ◀ LEFT ARROW — always rendered, dimmed when disabled */}
                    <button
                        onClick={() => slide("left")}
                        disabled={!canLeft}
                        aria-label="Scroll left"
                        className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow
                                   transition-all duration-200 hover:bg-gray-100 hover:shadow-md
                                   disabled:opacity-25 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        <ChevronLeft size={16} className="text-gray-700" />
                    </button>

                    {/* Scrollable category list */}
                    <div
                        ref={scrollRef}
                        className="flex items-center gap-4 flex-1 overflow-x-auto"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                className="flex items-center gap-2.5 shrink-0 group rounded-full px-1.5 py-1 hover:bg-gray-50 transition-colors"
                            >
                                <RotatingIcon icons={cat.icons} bg={cat.bg} />
                                <span className="text-[12px] font-semibold text-gray-700 whitespace-nowrap group-hover:text-gray-900 transition-colors">
                                    {cat.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* ▶ RIGHT ARROW — always rendered, dimmed when disabled */}
                    <button
                        onClick={() => slide("right")}
                        disabled={!canRight}
                        aria-label="Scroll right"
                        className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow
                                   transition-all duration-200 hover:bg-gray-100 hover:shadow-md
                                   disabled:opacity-25 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        <ChevronRight size={16} className="text-gray-700" />
                    </button>

                </div>
            </div>
        </div>
    );
};

export default CategoryBar;
