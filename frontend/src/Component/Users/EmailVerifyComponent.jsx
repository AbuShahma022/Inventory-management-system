import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecoverVerifyEmail } from "../../APIRequest/UserAPIRequest.js";
import { ErrorToast, IsEmail } from "../../Helper/FormHelper.js";

function EmailVerifyComponent() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (IsEmail(email) === false) {
      ErrorToast("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await RecoverVerifyEmail(email);

      if (res === true) {
        navigate("/verify-otp");
      } else {
        ErrorToast(res?.data || "Verification failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      ErrorToast("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#e0eaf5] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-10 rounded-2xl shadow-xl border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Verify Your Email
        </h1>

        <p className="text-gray-600 text-center mb-8 text-sm">
          Enter your registered email address to receive a verification code.
        </p>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2 text-sm">
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
            className={`w-full px-4 py-3 border rounded-md text-gray-800 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                       transition-all text-base placeholder:text-gray-400 
                       ${error ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50"}`}
          />
          {error && (
            <p className="mt-2 text-red-500 text-sm font-medium">{error}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-md 
                     hover:bg-blue-700 transition-all shadow-md disabled:opacity-70"
        >
          {isLoading ? "Sending..." : "Next"}
        </button>
      </form>
    </div>
  );
}

export default EmailVerifyComponent;
