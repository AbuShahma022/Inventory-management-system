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
const BrandListPage = lazy(()=>import("./Pages/Brand/BrandListPage"))
const CategoryListPage = lazy(()=>import("./Pages/Category/CategoryListPage"))
const CustomerListPage = lazy(()=>import("./Pages/Customer/CustomerListPage"))
const SupplierListPage = lazy(()=>import("./Pages/Supply/SupplierListPage"))
const ExpenseTypeListPage = lazy(()=>import("./Pages/ExpenseType/ExpenseTypeListPage.jsx"))
const ExpenseListPage = lazy(()=>import("./Pages/Expense/ExpenseListPage.jsx"))
const ProductListPage = lazy(()=>import("./Pages/Product/ProductListPage.jsx"))
const PurchaseListPage = lazy(()=>import("./Pages/Purchase/PurchaseListPage.jsx"))
const SalesListPage = lazy(()=>import("./Pages/Sales/SalesListPage.jsx"))
const ReturnListPage = lazy(()=>import("./Pages/Return/ReturnListPage.jsx"))
const BrandCreateUpdatePage = lazy(()=>import("./Pages/Brand/BrandCreateUpdatePage.jsx"))
const CategoryCreateUpdatePage = lazy(()=>import("./Pages/Category/CategoryCreateUpdatePage.jsx"))
const CustomerCreateUpdatePage = lazy(()=>import("./Pages/Customer/CustomerCreateUpdatePage.jsx"))
const SupplierCreateUpdatePage = lazy(()=>import("./Pages/Supply/SupplierCreateUpdatePage.jsx"))  
const ExpenseTypeCreateUpdatePage = lazy(()=>import("./Pages/ExpenseType/ExpenseTypeCreateUpdatePage.jsx"))
const ExpenseCreateUpdatePage = lazy(()=>import("./Pages/Expense/ExpenseCreateUpdatePage.jsx"))
const ProductCreateUpdatePage = lazy(()=>import("./Pages/Product/ProductCreateUpdatePage.jsx"))
const PurchaseCreateUpdatePage = lazy(()=>import("./Pages/Purchase/PurchaseCreateUpdatePage.jsx"))
const SalesCreateUpdatePage = lazy(()=>import("./Pages/Sales/SalesCreateUpdatePage.jsx"))
const ReturnCreateUpdatePage = lazy(()=>import("./Pages/Return/ReturnCreateUpdatePage.jsx"))
const ExpenseReportPage = lazy(()=>import("./Pages/Report/ExpenseReportPage.jsx"))
const PurchaseReportPage = lazy(()=>import("./Pages/Report/PurchaseReportPage.jsx"))
const SalesReportPage = lazy(()=>import("./Pages/Report/SalesReportPage.jsx"))
const ReturnReportPage = lazy(()=>import("./Pages/Report/ReturnReportPage.jsx"))


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
              <Route path="/brand/list" element={<BrandListPage />} />
              <Route path="/category/list" element={<CategoryListPage />} />
              <Route path="/customer/list" element={<CustomerListPage />} />
              <Route path="/supplier/list" element={<SupplierListPage />} />
              <Route path="/expense/type/list" element={<ExpenseTypeListPage />} />
              <Route path="/expense/list" element={<ExpenseListPage />} />
              <Route path="/product/list" element={<ProductListPage />} />
              <Route path="/purchase/list" element={<PurchaseListPage />} />
              <Route path="/sale/list" element={<SalesListPage />} />
              <Route path="/return/list" element={<ReturnListPage />} />
              <Route path="/brand/create_update" element={<BrandCreateUpdatePage />} />
              <Route path="/brand/create_update/:id" element={<BrandCreateUpdatePage />} />
              <Route path="/category/create_update" element={<CategoryCreateUpdatePage />} />
              <Route path="/category/create_update/:id" element={<CategoryCreateUpdatePage />} />
              <Route path="/customer/create_update" element={<CustomerCreateUpdatePage />} />
              <Route path="/customer/create_update/:id" element={<CustomerCreateUpdatePage />} />
              <Route path="/supplier/create_update" element={<SupplierCreateUpdatePage />} />
              <Route path="/supplier/create_update/:id" element={<SupplierCreateUpdatePage />} />
              <Route path="/expense/type/create_update" element={<ExpenseTypeCreateUpdatePage />} />
              <Route path="/expense/type/create_update/:id" element={<ExpenseTypeCreateUpdatePage />} />
              <Route path="/expense/create_update" element={<ExpenseCreateUpdatePage />} />
              <Route path="/expense/create_update/:id" element={<ExpenseCreateUpdatePage />} />
              <Route path="/product/create_update" element={<ProductCreateUpdatePage />} />
              <Route path="/product/create_update/:id" element={<ProductCreateUpdatePage />} />
              <Route path="/purchase/create_update" element={<PurchaseCreateUpdatePage />} />
              <Route path="/purchase/create_update/:id" element={<PurchaseCreateUpdatePage />} />
              <Route path="/sale/create_update" element={<SalesCreateUpdatePage />} />
              <Route path="/sale/create_update/:id" element={<SalesCreateUpdatePage />} />
              <Route path="/return/create_update" element={<ReturnCreateUpdatePage />} />
              <Route path="/return/create_update/:id" element={<ReturnCreateUpdatePage />} />
              <Route path="/report/expense" element={<ExpenseReportPage />} />
              <Route path="/report/purchase" element={<PurchaseReportPage />} />
              <Route path="/report/sale" element={<SalesReportPage />} />
              <Route path="/report/return" element={<ReturnReportPage />} />
              

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
