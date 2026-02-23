import { Package } from "lucide-react";
import Header from "../components/layout/Header";

const Orders = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
                <div className="bg-[#0d4f6e]/10 rounded-full p-6">
                    <Package size={48} className="text-[#0d4f6e]" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Your Orders</h1>
                <p className="text-gray-500 max-w-xs">
                    No orders yet. Place your first order to see it here.
                </p>
            </main>
        </div>
    );
};

export default Orders;
