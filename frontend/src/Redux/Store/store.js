import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "../State-Slice/LoaderSlice.js";
import profileReducer from "../State-Slice/ProfileSlice.js";
import userDetailsReducer from "../State-Slice/UserDetailsSlice.js";
import BrandReducer from "../State-Slice/BrandSlice.js";
import CategoryReducer from "../State-Slice/CategorySlice.js";
import CustomerReducer from "../State-Slice/CustomerSlice.js";
import SupplyReducer from "../State-Slice/SupplySlice.js";
import ExpenseTypeReducer from "../State-Slice/ExpenseTypeSlice.js";
import ExpenseReducer from "../State-Slice/ExpenseSlice.js";
import ProductReducer from "../State-Slice/ProductSlice.js";
import PurchaseReducer from "../State-Slice/PurchaseSlice.js";
import SalesReducer from "../State-Slice/SalesSlice.js";
import ReturnReducer from "../State-Slice/ReturnSlice.js";

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    profile: profileReducer,
    userDetails: userDetailsReducer,
    brand: BrandReducer,
    category: CategoryReducer,
    customer: CustomerReducer,
    supply: SupplyReducer,
    expenseType: ExpenseTypeReducer,
    expense: ExpenseReducer,
    product: ProductReducer,
    purchase: PurchaseReducer,
    sales: SalesReducer,
    return: ReturnReducer

  },
});

export default store;
