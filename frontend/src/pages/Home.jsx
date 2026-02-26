import { useState, useEffect, useRef } from "react";
import Header from "../components/layout/Header";
import DeliveryBar from "../components/layout/DeliveryBar";
import Footer from "../components/layout/Footer";
import CategoryBar from "../components/layout/CategoryBar";
import PromoBanner from "../components/home/PromoBanner";
import FashionCard from "../components/home/FashionCard";
import PromoCard from "../components/home/PromoCard";
import ClearanceBanner from "../components/home/ClearanceBanner";
import FashionDealsBanner from "../components/home/FashionDealsBanner";
import ProductSection from "../components/home/ProductSection";
import ShopTopCategories from "../components/home/ShopTopCategories";
import TopCategoryCards from "../components/home/TopCategoryCards";

import {
    brandCategories,
    promoSlides,
    kitchenProducts,
    electronicsProducts,
    grabGoProducts,
    cookingProducts,
    fashionBestsellers,
    foreverInStyleProducts,
    seasonsSweetnessProducts,
    luggageSportsProducts,
    techPicksProducts,
    topPicksProducts,
    footwearClearanceProducts,
    lifestyleCategories,
    foodCategories,
} from "../data/homeData";

const Home = () => {
    /* ── Refs to measure real DOM heights ───────────────────── */
    const headerRef = useRef(null);
    const deliveryRef = useRef(null);
    const categoryRef = useRef(null);
    const promoBannerRef = useRef(null);

    /* ── Measured heights ────────────────────────────────────── */
    const [headerH, setHeaderH] = useState(64);
    const [deliveryH, setDeliveryH] = useState(36);
    const [categoryH, setCategoryH] = useState(76);
    const [promoBannerH, setPromoBannerH] = useState(260);

    /* ── Delivery bar visibility ─────────────────────────────── */
    const [deliveryVisible, setDeliveryVisible] = useState(true);

    /* ── Measure on mount & resize ───────────────────────────── */
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
        const handleScroll = () => setDeliveryVisible(window.scrollY < threshold);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [promoBannerH]);

    /* ── Derived positions ───────────────────────────────────── */
    const categoryTop = deliveryVisible ? headerH + deliveryH : headerH;
    const maxFixedH = headerH + deliveryH + categoryH;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            {/* ── Fixed: Header ─────────────────────────────────── */}
            <div ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
                <Header />
            </div>

            {/* ── Fixed: Delivery bar ───────────────────────────── */}
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

            {/* ── Fixed: Category bar ───────────────────────────── */}
            <div
                ref={categoryRef}
                className="fixed left-0 right-0 z-30 bg-white border-b border-gray-100 shadow-sm"
                style={{ top: `${categoryTop}px`, transition: "top 0.35s ease" }}
            >
                <CategoryBar />
            </div>

            {/* ── Scrollable content ────────────────────────────── */}
            <div style={{ paddingTop: `${maxFixedH}px` }}>
                <div ref={promoBannerRef}>
                    <PromoBanner />
                </div>

                <FashionCard />
                <ClearanceBanner />
                <FashionDealsBanner />

                {/* ── Reusable product sections ─────────────────── */}
                <ProductSection title="Cooking Essentials" products={cookingProducts} showQuickAdd />
                <ProductSection title="Home & Kitchen Needs" products={kitchenProducts} />
                <ProductSection title="Electronics Zone | Up To 10% Off | Code Tech100" products={electronicsProducts} />
                <ProductSection title="Grab & Go" products={grabGoProducts} />

                {/* ── Category card rows ────────────────────────── */}
                <ShopTopCategories />
                <TopCategoryCards categories={lifestyleCategories} />
                <TopCategoryCards categories={foodCategories} />
                <ProductSection title="Fashion Bestsellers | Flat 20% Off | Code: STYLE20" products={fashionBestsellers} showQuickAdd />
                <ProductSection title="Forever In Style | Extra 10% Off | Code: FASHION10" products={foreverInStyleProducts} showQuickAdd />
                <ProductSection title="Season's Sweetness" products={seasonsSweetnessProducts} showQuickAdd />
                <ProductSection title="Luggage | Sports | Auto Care & More" products={luggageSportsProducts} />
                <FashionCard
                    cards={promoSlides}
                    renderCard={(slide, key) => <PromoCard key={key} slide={slide} cardKey={key} minHeight="100px" />}
                    cardsPerPage={3}
                    showDots={false}
                />
                <ShopTopCategories
                    text="Brands you love"
                    bg="#0d4f8c"
                    textColor="#ffffff"
                    height="180px"
                    fontSize="clamp(24px, 2.5vw, 36px)"
                />
                <TopCategoryCards
                    categories={brandCategories}
                    cardBg="linear-gradient(160deg, #1565c0 0%, #1e88e5 55%, #64b5f6 100%)"
                />
                <ProductSection title="Tech Picks" products={techPicksProducts} />
                <ProductSection title="Top Picks" products={topPicksProducts} />
                <ProductSection title="Footwear Clearance" products={footwearClearanceProducts} titleColor="#c0392b" sectionBg="#e3f2fd" />
                <ShopTopCategories
                    text="Continue Shopping"
                    bg="#E8833A"
                    textColor="#111827"
                    height="90px"
                    fontSize="clamp(22px, 2.5vw, 34px)"
                />
                <ShopTopCategories
                    text="GoBasket cares"
                    subtitle={"WE DO NOT ASK FOR YOUR BANK ACCOUNT OR CARD DETAILS VERBALLY OR TELEPHONICALLY.\nWE ALSO DO NOT ASK FOR MONEY TO PARTICIPATE IN ANY OF OUR OFFERS OR RUN ANY LUCKY DRAWS."}
                    bg="#9c27b0"
                    textColor="#ffffff"
                    height="110px"
                    fontSize="clamp(30px, 2vw, 38px)"
                />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
