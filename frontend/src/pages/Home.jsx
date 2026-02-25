import { useState, useEffect, useRef } from "react";
import Header from "../components/layout/Header";
import DeliveryBar from "../components/layout/DeliveryBar";
import CategoryBar from "../components/layout/CategoryBar";
import PromoBanner from "../components/home/PromoBanner";
import FashionCard from "../components/home/FashionCard";
import ClearanceBanner from "../components/home/ClearanceBanner";
import FashionDealsBanner from "../components/home/FashionDealsBanner";
import HomeKitchenSection from "../components/home/HomeKitchenSection";
import CookingEssentialsSection from "../components/home/CookingEssentialsSection";
import ElectronicsZoneSection from "../components/home/ElectronicsZoneSection";
import GrabAndGoSection from "../components/home/GrabAndGoSection";
import ShopTopCategories from "../components/home/ShopTopCategories";

const Home = () => {
    /* ── Refs to measure real DOM heights ───────────────────── */
    const headerRef = useRef(null);
    const deliveryRef = useRef(null);
    const categoryRef = useRef(null);
    const promoBannerRef = useRef(null);

    /* ── Measured heights (updated after mount) ─────────────── */
    const [headerH, setHeaderH] = useState(64);
    const [deliveryH, setDeliveryH] = useState(36);
    const [categoryH, setCategoryH] = useState(76);
    const [promoBannerH, setPromoBannerH] = useState(260);

    /* ── Delivery bar visibility ─────────────────────────────── */
    const [deliveryVisible, setDeliveryVisible] = useState(true);

    /* ── Measure heights on mount & resize ──────────────────── */
    useEffect(() => {
        const measure = () => {
            if (headerRef.current) setHeaderH(headerRef.current.offsetHeight);
            if (deliveryRef.current) setDeliveryH(deliveryRef.current.offsetHeight);
            if (categoryRef.current) setCategoryH(categoryRef.current.offsetHeight);
            if (promoBannerRef.current) setPromoBannerH(promoBannerRef.current.offsetHeight);
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    /* ── Scroll listener ─────────────────────────────────────── */
    useEffect(() => {
        const threshold = promoBannerH / 2;
        const handleScroll = () => {
            setDeliveryVisible(window.scrollY < threshold);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [promoBannerH]);

    /* ── Derived positions ───────────────────────────────────── */
    // CategoryBar top: slides up when delivery bar hides
    const categoryTop = deliveryVisible ? headerH + deliveryH : headerH;
    // Total fixed height = base (never changes) — we keep padding-top constant
    // so the page content never "jumps" when delivery bar toggles
    const maxFixedH = headerH + deliveryH + categoryH;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            {/* ── Fixed: Header ─────────────────────────────── */}
            <div
                ref={headerRef}
                className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
            >
                <Header />
            </div>

            {/* ── Fixed: Delivery bar (collapses on scroll) ─── */}
            <div
                ref={deliveryRef}
                className="fixed left-0 right-0 z-40 overflow-hidden"
                style={{
                    top: `${headerH}px`,
                    maxHeight: deliveryVisible ? `${deliveryH + 20}px` : "0px",
                    opacity: deliveryVisible ? 1 : 0,
                    transition: "max-height 0.35s ease, opacity 0.3s ease",
                }}
            >
                <DeliveryBar />
            </div>

            {/* ── Fixed: Category bar ───────────────────────── */}
            <div
                ref={categoryRef}
                className="fixed left-0 right-0 z-30 bg-white border-b border-gray-100 shadow-sm"
                style={{
                    top: `${categoryTop}px`,
                    transition: "top 0.35s ease",
                }}
            >
                <CategoryBar />
            </div>

            {/* ── Scrollable content — padded so it starts below fixed stack ── */}
            <div style={{ paddingTop: `${maxFixedH}px` }}>
                <div ref={promoBannerRef}>
                    <PromoBanner />
                </div>
                <FashionCard />
                <ClearanceBanner />
                <FashionDealsBanner />
                <CookingEssentialsSection />
                <HomeKitchenSection />
                <ElectronicsZoneSection />
                <GrabAndGoSection />
                <ShopTopCategories />
            </div>
        </div>
    );
};

export default Home;
