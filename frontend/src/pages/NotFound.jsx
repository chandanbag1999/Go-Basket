import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 text-center px-4">
            <p className="text-8xl">🛒</p>
            <h1 className="text-4xl font-bold text-gray-800">404</h1>
            <p className="text-gray-500">Oops! This page doesn't exist.</p>
            <Link
                to="/"
                className="mt-2 px-6 py-2.5 bg-[#0d4f6e] text-white rounded-full text-sm font-semibold hover:bg-[#0b3f58] transition-colors"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
