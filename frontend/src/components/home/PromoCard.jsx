/**
 * PromoCard — used as a renderCard function inside FashionCard carousel.
 * Each slide has: title, offer, couponCode?, details?, bg, emoji, btnBg
 */
const PromoCard = ({ slide, cardKey, minHeight = "200px" }) => (
    <div
        key={cardKey}
        className="relative flex-1 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between"
        style={{ minHeight, background: slide.bg }}
    >
        {/* Coupon code badge — top right */}
        {slide.couponCode && (
            <div
                className="absolute top-0 right-0 flex flex-col items-center justify-center px-3 py-2 rounded-bl-2xl"
                style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(4px)", minWidth: "80px" }}
            >
                <span className="font-semibold text-white uppercase" style={{ fontSize: "8px", letterSpacing: "0.08em" }}>
                    Coupon Code
                </span>
                <span className="font-black text-white" style={{ fontSize: "15px", letterSpacing: "0.05em" }}>
                    {slide.couponCode}
                </span>
            </div>
        )}

        {/* Left text block */}
        <div className="flex flex-col gap-1.5 px-5 pt-5 pb-3 z-10 max-w-[55%]">
            <span
                className="font-bold uppercase tracking-wide"
                style={{ fontSize: "10px", color: slide.labelColor || "rgba(255,255,255,0.8)" }}
            >
                {slide.label}
            </span>
            <h3
                className="font-black leading-tight"
                style={{ fontSize: "18px", color: slide.titleColor || "#fff", whiteSpace: "pre-line" }}
            >
                {slide.title}
            </h3>
            {slide.offer && (
                <p className="font-bold" style={{ fontSize: "14px", color: slide.offerColor || "#fff" }}>
                    {slide.offer}
                </p>
            )}
            {slide.details && (
                <p className="leading-snug" style={{ fontSize: "9px", color: slide.detailColor || "rgba(255,255,255,0.75)", whiteSpace: "pre-line" }}>
                    {slide.details}
                </p>
            )}
            <button
                className="self-start mt-1 px-4 py-1.5 rounded-full font-bold shadow transition-all hover:scale-105 active:scale-95"
                style={{ fontSize: "11px", background: slide.btnBg || "#e53935", color: slide.btnText || "#fff" }}
            >
                Shop Now
            </button>
        </div>

        {/* Right emoji / illustration */}
        <div
            className="absolute right-4 bottom-2 flex items-end justify-end"
            style={{ fontSize: "64px", lineHeight: 1 }}
        >
            {slide.emoji}
        </div>
    </div>
);

export default PromoCard;
