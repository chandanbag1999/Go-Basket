import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Plus } from "lucide-react";

/**
 * Reusable product section.
 *
 * Props:
 *   title       {string}   – section heading (supports pipe-separated subtitles)
 *   products    {Array}    – array of product objects:
 *                           { emoji, name, price, original, off, bg, sponsored? }
 *   showQuickAdd {boolean} – show the green + quick-add button on image (default false)
 *   viewAll     {string}   – optional "View All" href (default "#")
 */

const SCROLL_AMOUNT = 700;

const ProductSection = ({ title, products = [], showQuickAdd = false, viewAll = "#", titleColor = "#111827", sectionBg = "#ffffff" }) => {
    const scrollRef = useRef(null);
    const [loved, setLoved] = useState({});
    const [added, setAdded] = useState({});

    const scroll = (dir) =>
        scrollRef.current?.scrollBy({ left: dir === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT, behavior: "smooth" });

    const toggleLove = (i) => setLoved((p) => ({ ...p, [i]: !p[i] }));
    const handleAdd = (i) => setAdded((p) => ({ ...p, [i]: true }));

    return (
        <div className="px-4 lg:px-[268px] pt-6 pb-4 mt-5" style={{ background: sectionBg }}>
            {/* ── Header ───────────────────────────────────────────── */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-black" style={{ fontSize: "22px", color: titleColor }}>
                    {title}
                </h2>
                <a href={viewAll} className="font-bold text-blue-600 hover:underline shrink-0 ml-4" style={{ fontSize: "14px" }}>
                    View All
                </a>
            </div>

            {/* ── Scrollable row ────────────────────────────────────── */}
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

                {/* Cards */}
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
                            {/* Image */}
                            <div
                                className="relative flex items-center justify-center rounded-t-2xl"
                                style={{ height: "140px", background: p.bg }}
                            >
                                {p.sponsored && (
                                    <span
                                        className="absolute top-2 left-2 bg-gray-200 text-gray-500 font-semibold rounded px-1.5 py-0.5"
                                        style={{ fontSize: "9px" }}
                                    >
                                        Sponsored
                                    </span>
                                )}

                                <span style={{ fontSize: "60px" }}>{p.emoji}</span>

                                <button onClick={() => toggleLove(i)} className="absolute top-2 right-2 p-1">
                                    <Heart size={18} className={loved[i] ? "fill-red-500 text-red-500" : "text-gray-300 hover:text-red-400"} />
                                </button>

                                {showQuickAdd && (
                                    <button
                                        onClick={() => handleAdd(i)}
                                        className="absolute bottom-2 left-2 flex items-center justify-center rounded"
                                        style={{ width: "22px", height: "22px", background: added[i] ? "#2e7d32" : "#43a047" }}
                                    >
                                        <Plus size={14} className="text-white" strokeWidth={3} />
                                    </button>
                                )}
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

export default ProductSection;
