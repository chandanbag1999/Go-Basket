 const ShopTopCategories = () => {
    return (
        <div className="px-4 lg:px-[268px] bg-gray-50 pt-5 pb-2">
            <div
                className="w-full flex items-center justify-center rounded-2xl"
                style={{ background: "#F5820D", paddingTop: "39px", paddingBottom: "39px" }}
            >
                <h2
                    className="font-black text-gray-900 text-center"
                    style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.01em" }}
                >
                    Shop From Top Categories
                </h2>
            </div>
        </div>
    );
};

export default ShopTopCategories;
