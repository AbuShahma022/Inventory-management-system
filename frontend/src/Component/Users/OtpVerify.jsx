import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RecoverVerifyOtp } from "../../APIRequest/UserAPIRequest.js";
import { ErrorToast, SuccessToast } from "../../Helper/FormHelper.js";
import { getEmail } from "../../Helper/SessionHelper.js";

function OtpVerify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const email = getEmail(); // ✅ Email stored in localStorage via setEmail()

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError("");

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setIsVerifying(true);
    try {
      const res = await RecoverVerifyOtp(email, otpCode);

      if (res === true) {
        SuccessToast("OTP verified successfully!");
        navigate("/create-password");
      } else {
        ErrorToast(res?.data || "Invalid or expired OTP. Try again.");
      }
    } catch (err) {
      console.error(err);
      ErrorToast("Something went wrong. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#e0eaf5] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-10 rounded-2xl shadow-xl border border-gray-200 text-center"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Verify OTP Code
        </h1>
        <p className="text-gray-600 mb-8 text-sm">
          Enter the 6-digit code sent to <br />
          <span className="font-semibold text-blue-600">{email}</span>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md bg-gray-50 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                         transition-all duration-200"
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm font-medium mb-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={isVerifying}
          className="w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-md 
                     hover:bg-blue-700 transition-all shadow-md disabled:opacity-70"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </button>

       
      </form>
    </div>
  );
}

export default OtpVerify;
