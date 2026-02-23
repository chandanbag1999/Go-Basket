import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import Header from "../components/layout/Header";

const TrackOrder = () => {
    const { orderId } = useParams();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
                <div className="bg-[#0d4f6e]/10 rounded-full p-6">
                    <MapPin size={48} className="text-[#0d4f6e]" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Live Tracking</h1>
                <p className="text-gray-500">
                    Order ID: <span className="font-mono font-semibold text-gray-700">{orderId}</span>
                </p>
                <p className="text-gray-400 text-sm max-w-xs">
                    Live map tracking coming soon — Socket.io integration pending.
                </p>
            </main>
        </div>
    );
};

export default TrackOrder;
