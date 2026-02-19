import { useState, useEffect, useRef } from "react";
import { verifyOtp, sendOtp } from "../../services/authApi";

const OTPModal = ({ mobile, onBack, onVerify }) => {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRefs = useRef([]);

    // Countdown
    useEffect(() => {
        if (timer === 0) { setCanResend(true); return; }
        const interval = setInterval(() => setTimer((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleResend = async () => {
        if (!canResend) return;
        try {
            await sendOtp(mobile);
            setTimer(30);
            setCanResend(false);
            setOtp(Array(6).fill(""));
            setError("");
            inputRefs.current[0]?.focus();
        } catch (err) {
            setError(err.message || "Failed to resend OTP.");
        }
    };

    const handleChange = (index, value) => {
        const digit = value.replace(/\D/g, "").slice(-1);
        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);
        if (digit && index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e) => {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (!pasted) return;
        const newOtp = Array(6).fill("");
        pasted.split("").forEach((char, i) => (newOtp[i] = char));
        setOtp(newOtp);
        inputRefs.current[Math.min(pasted.length, 5)]?.focus();
        e.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join("");
        if (otpValue.length < 6) return;
        setLoading(true);
        setError("");
        try {
            const result = await verifyOtp(mobile, otpValue);
            onVerify?.(result); // passes { isNewUser, token?, user? }
        } catch (err) {
            setError(err.message || "Invalid OTP. Please try again.");
            setOtp(Array(6).fill(""));
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
            <div className="relative bg-white rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.12)] w-full max-w-sm px-8 py-10 mx-4">

                {/* Back */}
                <button
                    onClick={onBack}
                    className="absolute top-4 left-5 text-sky-500 hover:text-sky-700 transition-colors text-xl leading-none"
                    aria-label="Go back"
                >
                    ‹
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-1">Verify OTP</h2>
                <p className="text-sm text-gray-500 mb-1">
                    Enter the OTP sent to <span className="font-semibold text-gray-800">+91-{mobile}</span>
                </p>
                <button onClick={onBack} className="text-sm text-sky-500 font-semibold hover:underline mb-6 block">
                    Update number
                </button>

                <form onSubmit={handleSubmit}>
                    <div className="flex gap-3 mb-2" onPaste={handlePaste}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="tel"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => { handleChange(index, e.target.value); setError(""); }}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-10 text-center text-lg font-semibold text-gray-800 border-b-2 border-gray-400 focus:border-sky-500 outline-none bg-transparent pb-1 transition-colors"
                            />
                        ))}
                    </div>

                    {/* Error */}
                    {error && <p className="text-xs text-red-500 mt-2">{error}</p>}

                    {/* Resend */}
                    <div className="text-right mb-8 mt-2">
                        {canResend ? (
                            <button type="button" onClick={handleResend} className="text-xs text-sky-500 font-semibold hover:underline">
                                Resend OTP
                            </button>
                        ) : (
                            <span className="text-xs text-sky-400">Resend OTP in {timer}s</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={otp.join("").length < 6 || loading}
                        className="w-full py-3 rounded-full bg-sky-200 hover:bg-sky-300 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold tracking-wide transition-colors"
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OTPModal;
