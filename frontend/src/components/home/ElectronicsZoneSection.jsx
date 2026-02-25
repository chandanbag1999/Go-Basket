import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const products = [
    {
        emoji: "🔌",
        name: "Ambrane 67 Watt GAN Charger, Dual Ports Type ...",
        price: 1799,
        original: 4999,
        off: 64,
        bg: "#f0f4ff",
    },
    {
        emoji: "🎧",
        name: "Redmi Buds 5A, Active Noise Cancelling True...",
        price: 999,
        original: 2999,
        off: 66,
        bg: "#f5f5f5",
    },
    {
        emoji: "🔋",
        name: "boAt EnergyShroom PB331 MagnaCharge, 10000 mA...",
        price: 1399,
        original: 4499,
        off: 68,
        bg: "#f0f0f0",
    },
    {
        emoji: "🎵",
        name: "boAt Airdopes 138 with 60 HRS Playback, ASAP...",
        price: 899,
        original: 2990,
        off: 69,
        bg: "#f5f5f5",
    },
    {
        emoji: "🪫",
        name: "Hammer Ultra Charge Y20 20000 mAh 22.5 W Power...",
        price: 899,
        original: 2499,
        off: 64,
        bg: "#f0f4ff",
    },
    {
        emoji: "🔋",
        name: "Stuffcool Nuevo 25 W Type A + Type C GaN Mobile Fa...",
        price: 599,
        original: 1799,
        off: 66,
        bg: "#f5f5f5",
    },
    {
        emoji: "📱",
        name: "Samsung 25W Super Fast Charging USB Type-C...",
        price: 799,
        original: 1999,
        off: 60,
        bg: "#e8f5e9",
    },
    {
        emoji: "🖱️",
        name: "Logitech M235 Wireless Mouse, 2.4 GHz with USB...",
        price: 699,
        original: 1795,
        off: 61,
        bg: "#fff3e0",
    },
];

const SCROLL_AMOUNT = 700;

const ElectronicsZoneSection = () => {
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
                    Electronics Zone &nbsp;<span className="font-bold text-gray-700">|</span>&nbsp; Up To 10% Off &nbsp;<span className="font-bold text-gray-700">|</span>&nbsp; Code Tech100
                </h2>
                <button className="font-bold text-blue-600 hover:underline shrink-0 ml-4" style={{ fontSize: "14px" }}>
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
                               hover:bg-blue-500 hover:border-blue-500"
                    style={{ width: "32px", height: "32px" }}
                >
                    <ChevronLeft size={18} className="text-blue-500" />
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

                            {/* Info */}
                            <div className="flex flex-col gap-1 px-3 pt-2 pb-3 flex-1">
                                <p
                                    className="text-gray-800 leading-snug font-medium"
                                    style={{ fontSize: "12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                                >
                                    {p.name}
                                </p>
                                <p className="font-black text-gray-900 mt-1" style={{ fontSize: "14px" }}>
                                    ₹{p.price.toLocaleString()}.00
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="line-through text-gray-400" style={{ fontSize: "11px" }}>
                                        ₹{p.original.toLocaleString()}.00
                                    </span>
                                    <span className="font-bold text-green-600" style={{ fontSize: "11px" }}>
                                        {p.off}% OFF
                                    </span>
                                </div>
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
                               hover:bg-blue-500 hover:border-blue-500"
                    style={{ width: "32px", height: "32px" }}
                >
                    <ChevronRight size={18} className="text-blue-500" />
                </button>
            </div>
        </div>
    );
};

export default ElectronicsZoneSection;
