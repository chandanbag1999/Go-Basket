const col1 = [
    { label: "Grocery", orange: false },
    { label: "Electronics", orange: false },
    { label: "Fashion", orange: false },
    { label: "Home & Lifestyle", orange: false },
    { label: "Premium Fruits", orange: true },
    { label: "Books", orange: true },
    { label: "Furniture", orange: true },
];

const col2 = [
    "Biscuits, Drinks & Packaged Foods",
    "Fruits & Vegetables",
    "Cooking Essentials",
    "Dairy & Bakery",
    "Personal Care",
    "Beauty",
    "Home",
    "Mom & Baby Care",
    "School, Office & Stationery",
];

const col3 = [
    "My Account",
    "My Orders",
    "Wishlist",
    "Delivery Addresses",
    "GoBasket Wallet",
];

const col4 = [
    "About Us",
    "FAQ",
    "Terms & Conditions",
    "Privacy Policy",
    "E-waste Policy",
    "Cancellation & Return Policy",
    "Shipping & Delivery Policy",
    "AC Installation by resQ",
];

const ColHeader = ({ children }) => (
    <h4 className="font-black text-gray-900 mb-3" style={{ fontSize: "15px" }}>{children}</h4>
);

const ColLink = ({ label, orange }) => (
    <li>
        <a
            href="#"
            className="hover:underline leading-relaxed block"
            style={{ fontSize: "13px", color: orange ? "#e65c00" : "#374151" }}
        >
            {label}
        </a>
    </li>
);

const Footer = () => (
    <footer className="bg-gray-100 border-t border-gray-200 mt-6">
        {/* ── Main grid ──────────────────────────────────────────── */}
        <div className="px-4 lg:px-[268px] py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

            {/* Column 1 — All Categories */}
            <div>
                <ColHeader>All Categories</ColHeader>
                <ul className="space-y-1">
                    {col1.map((item, i) => <ColLink key={i} label={item.label} orange={item.orange} />)}
                </ul>
            </div>

            {/* Column 2 — Popular Categories */}
            <div>
                <ColHeader>Popular Categories</ColHeader>
                <ul className="space-y-1">
                    {col2.map((item, i) => <ColLink key={i} label={item} />)}
                </ul>
            </div>

            {/* Column 3 — Customer Account */}
            <div>
                <ColHeader>Customer Account</ColHeader>
                <ul className="space-y-1">
                    {col3.map((item, i) => <ColLink key={i} label={item} />)}
                </ul>
            </div>

            {/* Column 4 — Help & Support */}
            <div>
                <ColHeader>Help &amp; Support</ColHeader>
                <ul className="space-y-1">
                    {col4.map((item, i) => <ColLink key={i} label={item} />)}
                </ul>
            </div>

            {/* Column 5 — Contact Us */}
            <div>
                <ColHeader>Contact Us</ColHeader>
                <div className="space-y-1" style={{ fontSize: "13px", color: "#374151" }}>
                    <p>
                        WhatsApp us:{" "}
                        <a href="tel:7000370003" className="font-bold text-blue-600 hover:underline">
                            70003 70003
                        </a>
                    </p>
                    <p>
                        Call us:{" "}
                        <a href="tel:18008901222" className="font-bold text-blue-600 hover:underline">
                            1800 890 1222
                        </a>
                    </p>
                    <p className="text-gray-500" style={{ fontSize: "11px" }}>
                        8:00 AM to 8:00 PM, 365 days
                    </p>
                    <p className="mt-2 leading-snug text-gray-600" style={{ fontSize: "11px" }}>
                        Should you encounter any bugs, glitches, lack of functionality,
                        delayed deliveries, billing errors or other problems on the website.
                    </p>
                </div>

                {/* Download the app */}
                <div className="mt-4">
                    <h5 className="font-black text-gray-900 mb-2" style={{ fontSize: "14px" }}>
                        Download the app
                    </h5>
                    <div className="flex flex-col gap-2">
                        <a
                            href="#"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-white shadow transition-all hover:opacity-90"
                            style={{ background: "#111", fontSize: "10px", width: "fit-content", minWidth: "130px" }}
                        >
                            <span style={{ fontSize: "20px" }}>▶️</span>
                            <span className="leading-tight">
                                GET IT ON<br />
                                <strong style={{ fontSize: "13px" }}>Google Play</strong>
                            </span>
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-white shadow transition-all hover:opacity-90"
                            style={{ background: "#111", fontSize: "10px", width: "fit-content", minWidth: "130px" }}
                        >
                            <span style={{ fontSize: "20px" }}>🍎</span>
                            <span className="leading-tight">
                                Download on the<br />
                                <strong style={{ fontSize: "13px" }}>App Store</strong>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────── */}
        <div className="border-t border-gray-300 bg-gray-200">
            <div
                className="px-4 lg:px-[268px] py-3 flex flex-col md:flex-row items-center justify-between gap-2"
                style={{ fontSize: "11px", color: "#6b7280" }}
            >
                <div className="flex items-center gap-2">
                    <span style={{ fontSize: "16px" }}>🧺</span>
                    <span>© 2025 All rights reserved. GoBasket Technologies Pvt. Ltd.</span>
                </div>
                <span className="text-center">
                    Best viewed on Microsoft Edge 81+, Mozilla Firefox 75+, Safari 5.1.5+, Google Chrome 80+
                </span>
            </div>
        </div>
    </footer>
);

export default Footer;
