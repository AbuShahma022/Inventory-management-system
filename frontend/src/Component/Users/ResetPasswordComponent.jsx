import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPasswordComponent() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    // You could call backend API here to send OTP to email
    console.log("OTP sent to:", email);
    navigate("/verify-otp"); // navigate to otp page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-blue-100 text-sm">
              Enter your registered email to receive an OTP
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8">
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter your email"
                className={`w-full px-4 py-3.5 border ${
                  error ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50"
                } rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200 text-sm placeholder:text-gray-400`}
              />
              {error && (
                <p className="mt-1.5 text-red-500 text-xs">⚠ {error}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-base rounded-xl 
              hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-blue-500/30"
            >
              Next
            </button>
          </form>

          {/* Footer */}
         
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordComponent;
