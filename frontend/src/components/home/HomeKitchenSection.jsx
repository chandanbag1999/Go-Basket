import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const products = [
    {
        emoji: "🍳",
        name: "Ginara Heavy-Gauge Stainless Steel Sauce Pan...",
        price: 159,
        original: 659,
        off: 75,
        bg: "#f5f5f5",
    },
    {
        emoji: "🗂️",
        name: "Belizzi Fridge Storage Boxes 1500 ml (Set of 4)",
        price: 199,
        original: 999,
        off: 80,
        bg: "#f0f4ff",
    },
    {
        emoji: "🛏️",
        name: "Evokk India Pink & Beige Microfiber Ultra Soft,...",
        price: 69,
        original: 999,
        off: 93,
        bg: "#fff0f8",
    },
    {
        emoji: "💡",
        name: "Jivah 9-Watt White LED Bulb (Pack of 2)",
        price: 69,
        original: 320,
        off: 78,
        bg: "#fffde7",
    },
    {
        emoji: "🔪",
        name: "DeoDap Chopping Board Steel 1 Pc - Stainless Stee...",
        price: 229,
        original: 579,
        off: 60,
        bg: "#f5f5f5",
    },
    {
        emoji: "🥄",
        name: "Amaze Shoppee Sheesham Wood Cooking Spoon Set ...",
        price: 139,
        original: 599,
        off: 76,
        bg: "#fff8f0",
    },
    {
        emoji: "🧹",
        name: "Prestige Stainless Steel Pressure Cooker 3 L...",
        price: 899,
        original: 2499,
        off: 64,
        bg: "#f0fff4",
    },
    {
        emoji: "🪣",
        name: "Milton Insulated Casserole Set of 3 - Keep Warm...",
        price: 349,
        original: 999,
        off: 65,
        bg: "#f5f0ff",
    },
];

const SCROLL_AMOUNT = 700;

const HomeKitchenSection = () => {
    const scrollRef = useRef(null);
    const [loved, setLoved] = useState({});

    const scroll = (dir) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT, behavior: "smooth" });
        }
    };

    const toggleLove = (i) => setLoved((prev) => ({ ...prev, [i]: !prev[i] }));

    return (
        <div className="px-4 lg:px-[268px] bg-white pt-6 pb-4 mt-5">
            {/* ── Section header ─────────────────────────────────── */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-black text-gray-900" style={{ fontSize: "22px" }}>
                    Home &amp; Kitchen Needs
                </h2>
                <button className="font-bold text-blue-600 hover:underline" style={{ fontSize: "14px" }}>
                    View All
                </button>
            </div>

            {/* ── Scrollable row + arrows ─────────────────────────── */}
            <div className="relative group">
                {/* Left arrow */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20
                               flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-md
                               opacity-0 group-hover:opacity-100 transition-opacity duration-200
                               hover:bg-blue-500 hover:border-blue-500 hover:text-white"
                    style={{ width: "32px", height: "32px" }}
                >
                    <ChevronLeft size={18} className="text-blue-500 hover:text-white" />
                </button>

                {/* Product cards */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto pb-2"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {products.map((p, i) => (
                        <div
                            key={i}
                            className="shrink-0 flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                            style={{ width: "160px" }}
                        >
                            {/* Image area */}
                            <div
                                className="relative flex items-center justify-center rounded-t-2xl"
                                style={{ height: "140px", background: p.bg }}
                            >
                                <span style={{ fontSize: "60px" }}>{p.emoji}</span>
                                {/* Heart */}
                                <button
                                    onClick={() => toggleLove(i)}
                                    className="absolute top-2 right-2 p-1 rounded-full transition-colors"
                                >
                                    <Heart
                                        size={18}
                                        className={loved[i] ? "fill-red-500 text-red-500" : "text-gray-300 hover:text-red-400"}
                                    />
                                </button>
                            </div>

                            {/* Info area */}
                            <div className="flex flex-col gap-1 px-3 pt-2 pb-3 flex-1">
                                {/* Name */}
                                <p
                                    className="text-gray-800 leading-snug font-medium"
                                    style={{ fontSize: "12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                                >
                                    {p.name}
                                </p>

                                {/* Current price */}
                                <p className="font-black text-gray-900 mt-1" style={{ fontSize: "14px" }}>
                                    ₹{p.price}.00
                                </p>

                                {/* Original + off */}
                                <div className="flex items-center gap-2">
                                    <span className="line-through text-gray-400" style={{ fontSize: "11px" }}>
                                        ₹{p.original}.00
                                    </span>
                                    <span className="font-bold text-green-600" style={{ fontSize: "11px" }}>
                                        {p.off}% OFF
                                    </span>
                                </div>

                                {/* Add button */}
                                <button
                                    className="mt-2 w-full py-1.5 rounded-full border-2 border-blue-500 text-blue-600 font-bold bg-white hover:bg-blue-50 transition-colors"
                                    style={{ fontSize: "13px" }}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right arrow */}
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20
                               flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-md
                               opacity-0 group-hover:opacity-100 transition-opacity duration-200
                               hover:bg-blue-500 hover:border-blue-500 hover:text-white"
                    style={{ width: "32px", height: "32px" }}
                >
                    <ChevronRight size={18} className="text-blue-500 hover:text-white" />
                </button>
            </div>
        </div>
    );
};

export default HomeKitchenSection;
