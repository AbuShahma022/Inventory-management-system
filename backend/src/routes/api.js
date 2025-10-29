import express from "express";

import {
  Registration,
  UserLogin,
  UserDetails,
  UpdateUser,
  ResetPassword,
  VerifyEmail,
  VerifyOTP
} from "../controller/Users/UsersController.js";
import authVerifyMiddleware from "../middlewares/authVerifyMiddleware.js";

const router = express.Router();


// Routes
// User Routes
router.post("/register", Registration);
router.post("/login", UserLogin);
router.get("/details",authVerifyMiddleware, UserDetails);
router.post("/update", authVerifyMiddleware, UpdateUser);
router.post("/reset-password", ResetPassword);
router.get("/verify-email/:email", VerifyEmail);
router.get("/verify-otp/:email/:otp", VerifyOTP);

// Brand Routes
import {
    CreateBrand,
    UpdateBrand,
    ListBrand,
    DropDownBrand,
    BrandDetailsById,
    DeleteBrand
} from "../controller/Brands/BrandController.js";

router.post("/CreateBrands",authVerifyMiddleware, CreateBrand);
router.post("/UpdateBrands/:id", authVerifyMiddleware, UpdateBrand);
router.get("/BrandsList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ListBrand);
router.get ("/BrandsDropDown", authVerifyMiddleware, DropDownBrand);
router.get ("/DeleteBrand/:id", authVerifyMiddleware, DeleteBrand);
router.get("/BrandDetailsById/:id", authVerifyMiddleware, BrandDetailsById);

// Category Routes
import {
    CreateCategory,
    UpdateCategory,
    ListCategory,
    DropDownCategory,
    DeleteCategory,
    DetailByIdCategory
} from "../controller/Categories/CatergoryController.js";

router.post("/CreateCategory", authVerifyMiddleware, CreateCategory);
router.post("/UpdateCategory/:id", authVerifyMiddleware, UpdateCategory);
router.get("/CategoryList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ListCategory);
router.get ("/CategoryDropDown", authVerifyMiddleware, DropDownCategory);
router.get ("/DeleteCategory/:id", authVerifyMiddleware, DeleteCategory);
router.get("/DetailByIdCategory/:id", authVerifyMiddleware, DetailByIdCategory);



//Customer Routes
import {
    CreateCustomer,
    UpdateCustomer,
    ListCustomer,
    DropDownCustomer,
    DeleteCustomer,
    DetailByIdCustomer
} from "../controller/Customer/CustomerController.js";
router.post("/CreateCustomer", authVerifyMiddleware, CreateCustomer);
router.post("/UpdateCustomer/:id", authVerifyMiddleware, UpdateCustomer);
router.get("/CustomerList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ListCustomer);
router.get ("/CustomerDropDown", authVerifyMiddleware, DropDownCustomer);
router.get ("/DeleteCustomer/:id", authVerifyMiddleware, DeleteCustomer);
router.get("/DetailByIdCustomer/:id", authVerifyMiddleware, DetailByIdCustomer);

// Supplier Routes

import{
    CreateSupplier,
    UpdateSupplier,
    ListSupplier,
    DropDownSupplier,
    DeleteSupplier,
    DetailSupplier
} from "../controller/Supplier/SupplierController.js";

router.post("/CreateSupplier", authVerifyMiddleware, CreateSupplier);
router.post("/UpdateSupplier/:id", authVerifyMiddleware, UpdateSupplier);
router.get("/SupplierList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ListSupplier);
router.get ("/SupplierDropDown", authVerifyMiddleware, DropDownSupplier);
router.get ("/DeleteSupplier/:id", authVerifyMiddleware, DeleteSupplier);
router.get("/DetailSupplier/:id", authVerifyMiddleware, DetailSupplier);

// Expence Type Routes
import {
    CreateExpenceType,
    UpdateExpenceType,
    ExpenceTypeList,
    DropDownExpenceType,
    DeleteExpenceType,
    DetailByIdExpenceType
} from "../controller/Expences/ExpenceTypeController.js";

router.post("/CreateExpenceType", authVerifyMiddleware, CreateExpenceType);
router.post("/UpdateExpenceType/:id", authVerifyMiddleware, UpdateExpenceType);
router.get("/ExpenceTypeList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ExpenceTypeList);
router.get ("/ExpenceTypeDropDown", authVerifyMiddleware, DropDownExpenceType);
router.get ("/DeleteExpenceType/:id", authVerifyMiddleware, DeleteExpenceType);
router.get("/DetailByIdExpenceType/:id", authVerifyMiddleware, DetailByIdExpenceType);

// Expence Routes
import {
    CreateExpense,
    UpdateExpense,
    ExpenseList,
    DeleteExpense,
    DetailByIdExpense
} from "../controller/Expences/ExpensesControler.js";
router.post("/CreateExpense", authVerifyMiddleware, CreateExpense);
router.post("/UpdateExpense/:id", authVerifyMiddleware, UpdateExpense);
router.get("/ExpenseList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ExpenseList);
router.get("/DeleteExpense/:id", authVerifyMiddleware, DeleteExpense);
router.get("/ExpenseDetailById/:id", authVerifyMiddleware, DetailByIdExpense);

// Product Routes
import {
    CreateProduct,
    UpdateProduct,
    ListProduct,
    DeleteProduct,
    DetailProduct,
    ProductDropdown
} from "../controller/Products/ProductsController.js";

router.post("/CreateProduct", authVerifyMiddleware, CreateProduct);
router.post("/UpdateProduct/:id", authVerifyMiddleware, UpdateProduct);
router.get("/ProductList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ListProduct);
router.get("/DeleteProduct/:id", authVerifyMiddleware, DeleteProduct);
router.get("/DetailProduct/:id", authVerifyMiddleware, DetailProduct);
router.get("/ProductDropdown", authVerifyMiddleware, ProductDropdown);

// Purchase Routes
import {
    CreatePurchase,
    PurchaseList,
    DeletePurchase,
    DetailPurchase
} from "../controller/Purchases/PurchaseController.js";
router.post("/CreatePurchase", authVerifyMiddleware, CreatePurchase);
router.get("/PurchaseList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, PurchaseList);
router.get("/DeletePurchase/:id", authVerifyMiddleware, DeletePurchase);
router.get("/DetailPurchase/:id", authVerifyMiddleware, DetailPurchase);


// Sales Routes
import {
    CreateSales,
    SalesList,
    DeleteSales,
    DetailSales
} from "../controller/Sales/SalesController.js"
router.post("/CreateSales", authVerifyMiddleware, CreateSales);
router.get("/SalesList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, SalesList);
router.get("/DeleteSales/:id", authVerifyMiddleware, DeleteSales);
router.get("/DetailSales/:id", authVerifyMiddleware, DetailSales);

// Return Routes
import {
    CreateReturn,
    ReturnList,
    DeleteReturn,
    DetailReturn
} from "../controller/Return/ReturnController.js"
router.post("/CreateReturn", authVerifyMiddleware, CreateReturn);
router.get("/ReturnList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ReturnList);
router.get("/DeleteReturn/:id", authVerifyMiddleware, DeleteReturn);
router.get("/DetailReturn/:id", authVerifyMiddleware, DetailReturn);

// Report Routes
import { ExpenseByDate,PurchaseByDate,ReturnByDate,SalesByDate } from "../controller/Report/ReportController.js";
router.post("/ExpenseByDate", authVerifyMiddleware, ExpenseByDate);
router.post("/PurchaseByDate", authVerifyMiddleware, PurchaseByDate);
router.post("/ReturnByDate", authVerifyMiddleware, ReturnByDate);
router.post("/SalesByDate", authVerifyMiddleware, SalesByDate);

// Summary Routes
import { ExpenceSummaryController,
    PurchaseSummaryController,
    ReturnSummaryController,
    SalesSummaryController
    
 } from "../controller/Summary/SummaryController.js";

router.get("/ExpenceSummary", authVerifyMiddleware, ExpenceSummaryController);
router.get("/PurchaseSummary", authVerifyMiddleware, PurchaseSummaryController);
router.get("/ReturnSummary", authVerifyMiddleware, ReturnSummaryController);
router.get("/SalesSummary", authVerifyMiddleware, SalesSummaryController);

import AiChatController from "../controller/AIChat/ChatController.js";

router.post("/Chat", authVerifyMiddleware, AiChatController);






export default router;