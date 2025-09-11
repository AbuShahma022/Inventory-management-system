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



export default router;