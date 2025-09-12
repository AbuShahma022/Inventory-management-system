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
    DropDownBrand
} from "../controller/Brands/BrandController.js";

router.post("/CreateBrands", authVerifyMiddleware, CreateBrand);
router.post("/UpdateBrands/:id", authVerifyMiddleware, UpdateBrand);
router.get("/BrandsList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ListBrand);
router.get ("/BrandsDropDown", authVerifyMiddleware, DropDownBrand);

// Category Routes
import {
    CreateCategory,
    UpdateCategory,
    ListCategory,
    DropDownCategory
} from "../controller/Categories/CatergoryController.js";

router.post("/CreateCategory", authVerifyMiddleware, CreateCategory);
router.post("/UpdateCategory/:id", authVerifyMiddleware, UpdateCategory);
router.get("/CategoryList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ListCategory);
router.get ("/CategoryDropDown", authVerifyMiddleware, DropDownCategory);



//Customer Routes
import {
    CreateCustomer,
    UpdateCustomer,
    ListCustomer,
    DropDownCustomer
} from "../controller/Customer/CustomerController.js";
router.post("/CreateCustomer", authVerifyMiddleware, CreateCustomer);
router.post("/UpdateCustomer/:id", authVerifyMiddleware, UpdateCustomer);
router.get("/CustomerList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ListCustomer);
router.get ("/CustomerDropDown", authVerifyMiddleware, DropDownCustomer);

// Supplier Routes

import{
    CreateSupplier,
    UpdateSupplier,
    ListSupplier,
    DropDownSupplier
} from "../controller/Supplier/SupplierController.js";

router.post("/CreateSupplier", authVerifyMiddleware, CreateSupplier);
router.post("/UpdateSupplier/:id", authVerifyMiddleware, UpdateSupplier);
router.get("/SupplierList/:pageNo/:perPage/:searchKeyword", authVerifyMiddleware, ListSupplier);
router.get ("/SupplierDropDown", authVerifyMiddleware, DropDownSupplier);



export default router;