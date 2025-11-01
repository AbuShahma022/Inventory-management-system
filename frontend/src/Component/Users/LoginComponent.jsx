import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../../APIRequest/UserAPIRequest.js";
import { ErrorToast, IsEmail, IsEmpty, SuccessToast } from "../../Helper/FormHelper.js";

function LoginComponent() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // ✅ Validation
    if (IsEmpty(email)) return ErrorToast("Email is required");
    if (!IsEmail(email)) return ErrorToast("Invalid email format");
    if (IsEmpty(password)) return ErrorToast("Password is required");

    setIsLoading(true);
    const result = await UserLogin(email, password);
    setIsLoading(false);

    if (result === true) {
      
      window.location.href = "/"; // ✅ redirect immediately after login
    } else {
      ErrorToast("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-4">
              <span className="text-4xl font-bold text-white">📦</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-blue-100 text-sm">Inventory Management System</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            {/* Email */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl bg-gray-50 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                Password
              </label>
              <div className="relative">
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-xl bg-gray-50 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 text-lg"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right mb-5">
              <Link
                to="/verify-email"
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-base 
                rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 
                transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>

            {/* Demo Login Button */}
        <button
           type="button"
          onClick={() => {
          emailRef.current.value = "demometa1@gmail.com";
          passwordRef.current.value = "123456";
          SuccessToast("Demo credentials filled");
          }}
        className="w-full py-3.5 bg-gray-100 text-gray-700 font-semibold text-base 
       rounded-xl border border-gray-300 hover:bg-gray-200 transition-all duration-200 mb-4 mt-2"
      >
         Use Demo Login
        </button>



            {/* Register Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
