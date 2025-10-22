import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LazyLoader from "./Component/MasterLayout/LazyLoader.jsx";
import { getToken } from "./Helper/SessionHelper.js";
import FullScreenLoader from "./Component/MasterLayout/FullScreenLoader.jsx";
import { Toaster } from "react-hot-toast";

// ✅ Lazy loaded pages
const RegistrationPage = lazy(() => import("./Pages/Users/RegistrationsPage"));
const LoginPage = lazy(() => import("./Pages/Users/Login"));
const ProfilePage = lazy(() => import("./Pages/Users/ProfilePage"));
const VerifyOtpPage = lazy(() => import("./Pages/Users/VerifyOtpPage"));
const VerifyEmailPage = lazy(() => import("./Pages/Users/VerifyEmailPage"));
const ResetPasswordPage = lazy(() => import("./Pages/Users/ResetPaswordPage"));
const DashBoardPage = lazy(() => import("./Pages/DashBoard/DashBoardPage"));
const CreatePasswordPage = lazy(() => import("./Pages/Users/CreatePasswordPage"));

function App() {
  const token = getToken();

  return (
    <BrowserRouter>
      {/* ✅ Wrap all routes in Suspense for lazy loading */}
      <Suspense fallback={<LazyLoader />}>
        <Routes>
          {token ? (
            // ✅ Private routes
            <>
              <Route path="/" element={<DashBoardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            // ✅ Public routes
            <>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/verify-otp" element={<VerifyOtpPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/create-password" element={<CreatePasswordPage />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" reverseOrder={false} />

      {/* ✅ Full screen loader */}
      <FullScreenLoader />
    </BrowserRouter>
  );
}

export default App;
