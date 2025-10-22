import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResetPassword } from "../../APIRequest/UserAPIRequest.js";
import { ErrorToast } from "../../Helper/FormHelper.js";
import { getEmail, getOTP } from "../../Helper/SessionHelper.js";

function CreatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword.trim() || !confirmPassword.trim()) {
      ErrorToast("Please fill in all fields");
      return;
    }

  

    if (newPassword !== confirmPassword) {
      ErrorToast("Passwords do not match");
      return;
    }

    const email = getEmail();
    const otp = getOTP();
   

    if (!email || !otp) {
      ErrorToast("Session expired. Please verify your email again.");
      navigate("/verify-email");
      return;
    }

    setIsLoading(true);
    try {
      const res = await ResetPassword(email, otp, newPassword);
      if (res === true) {
        navigate("/login"); // ✅ goes to login only on success
      } else {
        ErrorToast("Password reset failed. Try again.");
      }
    } catch (err) {
      console.error("ResetPassword Error:", err);
      ErrorToast("Something went wrong. Try again.");
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
          Create New Password
        </h1>

        <p className="text-gray-600 text-center mb-8 text-sm">
          Enter and confirm your new password to complete the reset process.
        </p>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 
                       bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent transition-all text-base placeholder:text-gray-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 
                       bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent transition-all text-base placeholder:text-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-md 
                     hover:bg-blue-700 transition-all shadow-md disabled:opacity-70"
        >
          {isLoading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default CreatePassword;
