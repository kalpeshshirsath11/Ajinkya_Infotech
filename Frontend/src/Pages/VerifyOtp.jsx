import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const VerifyOtp = () => {

    const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    
    try {
  setLoading(true);

  console.log("Verifying OTP:", otp, email);

  const otpData = { otp, email };

  await axios.post(
    "http://localhost:8082/register",
    otpData
  );

  // success
  navigate("/login");

} catch (err) {
  setError(
    err.response?.data?.message ||
    "Invalid or expired OTP. Please try again."
  );
} finally {
  setLoading(false);
}

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-2">
          Verify OTP
        </h2>

        {/* Email info */}
        <p className="text-center text-gray-600 mb-6">
          We’ve sent a 6-digit OTP to <br />
          <span className="font-medium text-gray-800">{email}</span>
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter OTP"
            className="w-full text-center text-2xl tracking-widest border border-gray-300 rounded-lg py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend */}
        <div className="text-center mt-6">
          <button
            type="button"
            className="text-orange-600 hover:underline text-sm"
            onClick={() => console.log("Resend OTP")}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
