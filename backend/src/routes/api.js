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
    DeleteBrand
} from "../controller/Brands/BrandController.js";

router.post("/CreateBrands", authVerifyMiddleware, CreateBrand);
router.post("/UpdateBrands/:id", authVerifyMiddleware, UpdateBrand);
router.get("/BrandsList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ListBrand);
router.get ("/BrandsDropDown", authVerifyMiddleware, DropDownBrand);
router.get ("/DeleteBrand/:id", authVerifyMiddleware, DeleteBrand);

// Category Routes
import {
    CreateCategory,
    UpdateCategory,
    ListCategory,
    DropDownCategory,
    DeleteCategory
} from "../controller/Categories/CatergoryController.js";

router.post("/CreateCategory", authVerifyMiddleware, CreateCategory);
router.post("/UpdateCategory/:id", authVerifyMiddleware, UpdateCategory);
router.get("/CategoryList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ListCategory);
router.get ("/CategoryDropDown", authVerifyMiddleware, DropDownCategory);
router.get ("/DeleteCategory/:id", authVerifyMiddleware, DeleteCategory);



//Customer Routes
import {
    CreateCustomer,
    UpdateCustomer,
    ListCustomer,
    DropDownCustomer,
    DeleteCustomer
} from "../controller/Customer/CustomerController.js";
router.post("/CreateCustomer", authVerifyMiddleware, CreateCustomer);
router.post("/UpdateCustomer/:id", authVerifyMiddleware, UpdateCustomer);
router.get("/CustomerList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ListCustomer);
router.get ("/CustomerDropDown", authVerifyMiddleware, DropDownCustomer);
router.get ("/DeleteCustomer/:id", authVerifyMiddleware, DeleteCustomer);

// Supplier Routes

import{
    CreateSupplier,
    UpdateSupplier,
    ListSupplier,
    DropDownSupplier,
    DeleteSupplier
} from "../controller/Supplier/SupplierController.js";

router.post("/CreateSupplier", authVerifyMiddleware, CreateSupplier);
router.post("/UpdateSupplier/:id", authVerifyMiddleware, UpdateSupplier);
router.get("/SupplierList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ListSupplier);
router.get ("/SupplierDropDown", authVerifyMiddleware, DropDownSupplier);
router.get ("/DeleteSupplier/:id", authVerifyMiddleware, DeleteSupplier);

// Expence Type Routes
import {
    CreateExpenceType,
    UpdateExpenceType,
    ExpenceTypeList,
    DropDownExpenceType,
    DeleteExpenceType
} from "../controller/Expences/ExpenceTypeController.js";

router.post("/CreateExpenceType", authVerifyMiddleware, CreateExpenceType);
router.post("/UpdateExpenceType/:id", authVerifyMiddleware, UpdateExpenceType);
router.get("/ExpenceTypeList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ExpenceTypeList);
router.get ("/ExpenceTypeDropDown", authVerifyMiddleware, DropDownExpenceType);
router.get ("/DeleteExpenceType/:id", authVerifyMiddleware, DeleteExpenceType);

// Expence Routes
import {
    CreateExpense,
    UpdateExpense,
    ExpenseList,
    DeleteExpense
} from "../controller/Expences/ExpensesControler.js";
router.post("/CreateExpense", authVerifyMiddleware, CreateExpense);
router.post("/UpdateExpense/:id", authVerifyMiddleware, UpdateExpense);
router.get("/ExpenseList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ExpenseList);
router.get("/DeleteExpense/:id", authVerifyMiddleware, DeleteExpense);

// Product Routes
import {
    CreateProduct,
    UpdateProduct,
    ListProduct,
    DeleteProduct
} from "../controller/Products/ProductsController.js";

router.post("/CreateProduct", authVerifyMiddleware, CreateProduct);
router.post("/UpdateProduct/:id", authVerifyMiddleware, UpdateProduct);
router.get("/ProductList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ListProduct);
router.get("/DeleteProduct/:id", authVerifyMiddleware, DeleteProduct);

// Purchase Routes
import {
    CreatePurchase,
    PurchaseList,
    DeletePurchase
} from "../controller/Purchases/PurchaseController.js";
router.post("/CreatePurchase", authVerifyMiddleware, CreatePurchase);
router.get("/PurchaseList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, PurchaseList);
router.get("/DeletePurchase/:id", authVerifyMiddleware, DeletePurchase);


// Sales Routes
import {
    CreateSales,
    SalesList,
    DeleteSales
} from "../controller/Sales/SalesController.js"
router.post("/CreateSales", authVerifyMiddleware, CreateSales);
router.get("/SalesList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, SalesList);
router.get("/DeleteSales/:id", authVerifyMiddleware, DeleteSales);

// Return Routes
import {
    CreateReturn,
    ReturnList,
    DeleteReturn
} from "../controller/Return/ReturnController.js"
router.post("/CreateReturn", authVerifyMiddleware, CreateReturn);
router.get("/ReturnList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ReturnList);
router.get("/DeleteReturn/:id", authVerifyMiddleware, DeleteReturn);

// Report Routes
import { ExpenseByDate,PurchaseByDate,ReturnByDate,SalesByDate } from "../controller/Report/ReportController.js";
router.post("/ExpenseByDate", authVerifyMiddleware, ExpenseByDate);
router.post("/PurchaseByDate", authVerifyMiddleware, PurchaseByDate);
router.post("/ReturnByDate", authVerifyMiddleware, ReturnByDate);
router.post("/SalesByDate", authVerifyMiddleware, SalesByDate);



export default router;