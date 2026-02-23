import { useState } from "react";
import { useDispatch } from "react-redux";
import OTPModal from "./OTPModal";
import AccountSetupModal from "./AccountSetupModal";
import { sendOtp } from "../../services/authApi";
import { setCredentials } from "../../store/slices/authSlice";

const LoginModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const [mobile, setMobile] = useState("");
    const [step, setStep] = useState("login"); // "login" | "otp" | "setup"
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (mobile.length < 10) return;
        setLoading(true);
        setError("");
        try {
            await sendOtp(mobile);
            setStep("otp");
        } catch (err) {
            setError(err.message || "Failed to send OTP. Try again.");
        } finally {
            setLoading(false);
        }
    };

    if (step === "otp") {
        return (
            <OTPModal
                mobile={mobile}
                onBack={() => setStep("login")}
                onVerify={(result) => {
                    if (result.isNewUser) {
                        setStep("setup");
                    } else {
                        // Existing user — dispatch to Redux store
                        dispatch(setCredentials({ user: result.user, token: result.token }));
                        onClose();
                    }
                }}
            />
        );
    }

    if (step === "setup") {
        return (
            <AccountSetupModal
                mobile={mobile}
                onComplete={() => onClose()}
            />
        );
    }

    return (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
            <div className="relative bg-white rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.12)] w-full max-w-sm px-8 py-10 mx-4">

                <button
                    onClick={onClose}
                    className="absolute top-4 left-5 text-sky-500 hover:text-sky-700 transition-colors text-xl font-light leading-none"
                    aria-label="Close"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-1">Almost there!</h2>
                <p className="text-sm text-gray-500 mb-6">Simply sign in to place your order</p>

                <form onSubmit={handleSubmit}>
                    <label className="block text-xs text-gray-500 mb-1">Mobile Number</label>
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-sky-300 transition mb-4">
                        <span className="px-3 py-2 text-sm text-gray-700 bg-white select-none">+91-</span>
                        <input
                            type="tel"
                            maxLength={10}
                            value={mobile}
                            onChange={(e) => { setMobile(e.target.value.replace(/\D/g, "")); setError(""); }}
                            className="flex-1 py-2 pr-3 text-sm text-gray-800 outline-none bg-white"
                        />
                    </div>

                    {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

                    <p className="text-[11px] text-gray-400 mb-4 leading-relaxed">
                        By <span className="text-sky-500 cursor-pointer hover:underline">signing in</span>, you agree to our{" "}
                        <span className="text-sky-500 cursor-pointer hover:underline">Terms and Conditions of Use</span> and{" "}
                        <span className="text-sky-500 cursor-pointer hover:underline">Privacy Policy</span>.
                    </p>

                    <button
                        type="submit"
                        disabled={mobile.length < 10 || loading}
                        className="w-full py-3 rounded-full bg-sky-200 hover:bg-sky-300 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold tracking-wide transition-colors"
                    >
                        {loading ? "Sending OTP..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
