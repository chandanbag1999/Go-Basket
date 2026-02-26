/**
 * SectionBanner — reusable full-width label banner.
 *
 * Props:
 *   text       {string}  – main label text
 *   subtitle   {string}  – optional smaller text below the title
 *   bg         {string}  – background color / gradient
 *   textColor  {string}  – text color (default near-black)
 *   height     {string}  – banner height  (default "190px")
 *   fontSize   {string}  – clamp() or fixed size for main text
 */
const ShopTopCategories = ({
    text = "Shop From Top Categories",
    subtitle = "",
    bg = "#F5820D",
    textColor = "#111827",
    height = "190px",
    fontSize = "clamp(55px, 3.5vw, 50px)",
}) => {
    return (
        <div className="px-4 lg:px-[268px] bg-gray-50 pt-5 pb-2">
            <div
                className="w-full flex flex-col items-center justify-center rounded-2xl px-6 text-center"
                style={{ background: bg, height }}
            >
                <h2
                    className="font-black"
                    style={{ color: textColor, fontSize, letterSpacing: "-0.01em" }}
                >
                    {text}
                </h2>
                {subtitle && (
                    <p
                        className="mt-2 font-semibold uppercase leading-snug"
                        style={{ color: textColor, fontSize: "11px", opacity: 0.85, letterSpacing: "0.04em", maxWidth: "720px" }}
                    >
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ShopTopCategories;
