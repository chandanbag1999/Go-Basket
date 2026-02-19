import { useState } from "react";
import { setupProfile } from "../../services/authApi";

const AccountSetupModal = ({ mobile, onComplete }) => {
    const [firstName, setFirstName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstName.trim()) return;
        setLoading(true);
        setError("");
        try {
            const result = await setupProfile(mobile, firstName.trim());
            // Save JWT and user info
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));
            onComplete?.();
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
            <div className="relative bg-white rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.12)] w-full max-w-sm px-8 py-10 mx-4">

                <h2 className="text-2xl font-bold mb-1">
                    <span className="text-gray-900">Instant </span>
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                        account setup
                    </span>
                </h2>
                <p className="text-sm text-gray-500 mb-6">All we need is your name</p>

                <form onSubmit={handleSubmit}>
                    <label className="block text-xs text-gray-500 mb-1">
                        First name <span className="text-sky-500 font-semibold">*</span>
                    </label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => { setFirstName(e.target.value); setError(""); }}
                        autoFocus
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-sky-300 transition mb-4"
                    />

                    {/* Error */}
                    {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

                    <div className="mb-12" />

                    <button
                        type="submit"
                        disabled={!firstName.trim() || loading}
                        className="w-full py-3 rounded-full bg-sky-200 hover:bg-sky-300 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold tracking-wide transition-colors"
                    >
                        {loading ? "Setting up..." : "Get Started"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AccountSetupModal;
