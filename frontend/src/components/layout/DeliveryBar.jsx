import { useState } from "react";
import { Zap, ChevronDown, MapPin } from "lucide-react";

const DeliveryBar = () => {
    const [deliveryMode, setDeliveryMode] = useState("quick"); // "quick" | "scheduled"
    const [location] = useState("Kolkata 700121"); // placeholder — will come from user location

    return (
        <div className="w-full bg-[#0a6fa8]">
            <div className="flex items-center gap-3 px-4 lg:px-[268px] py-1.5">

                {/* Quick Delivery pill */}
                <button
                    onClick={() => setDeliveryMode("quick")}
                    className={`flex items-center gap-1 px-3 py-1 rounded text-[11px] font-semibold border transition-all whitespace-nowrap ${deliveryMode === "quick"
                        ? "bg-transparent border-white/60 text-white"
                        : "bg-transparent border-transparent text-white/50 hover:text-white/80"
                        }`}
                >
                    Quick Delivery
                </button>

                {/* Delivery location */}
                <button className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors group">
                    <Zap size={12} className="text-yellow-300 fill-yellow-300" />
                    <span className="text-[11px] font-medium">
                        Quick delivery to:
                    </span>
                    <span className="text-[11px] font-bold">
                        {location}
                    </span>
                    <ChevronDown size={12} className="text-white/60 group-hover:text-white transition-colors" />
                </button>
            </div>
        </div>
    );
};

export default DeliveryBar;
