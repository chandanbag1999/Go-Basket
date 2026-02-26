/**
 * TopCategoryCards – prop-driven category card row.
 *
 * Props:
 *   categories  {Array}  – array of { name, offer, emoji, emojiSize }
 */
const TopCategoryCards = ({ categories = [], cardBg = "linear-gradient(160deg, #F5820D 0%, #f7a24a 60%, #f5c07a 100%)" }) => {
    return (
        <div className="px-4 lg:px-[268px] bg-gray-50 pt-6 pb-5">
            <div className="flex gap-6 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                {categories.map((cat, i) => (
                    <div
                        key={i}
                        className="relative shrink-0 flex flex-col justify-between rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
                        style={{
                            flex: "1 1 0",
                            minWidth: "148px",
                            height: "270px",
                            background: cardBg,
                        }}
                    >
                        {/* Cloud at bottom */}
                        <div
                            className="absolute inset-x-0 bottom-0 h-14 pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse 100% 90% at 50% 130%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.45) 55%, transparent 80%)",
                            }}
                        />

                        {/* Text */}
                        <div className="relative z-10 px-3 pt-3">
                            <p
                                className="font-extrabold text-gray-900 whitespace-pre-line"
                                style={{ fontSize: "16px", lineHeight: "1.5" }}
                            >
                                {cat.name}
                            </p>
                            <p
                                className="font-black text-gray-900 mt-1"
                                style={{ fontSize: "18px", lineHeight: "1.4" }}
                            >
                                {cat.offer}
                            </p>
                        </div>

                        {/* Emoji */}
                        <div
                            className="absolute right-2 bottom-2 flex items-end justify-end z-10"
                            style={{ fontSize: cat.emojiSize }}
                        >
                            {cat.emoji}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopCategoryCards;
