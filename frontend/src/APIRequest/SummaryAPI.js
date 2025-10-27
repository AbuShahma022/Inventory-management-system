import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper.js";
import { getToken, setToken, setUserDetailsLocal,setEmail,setOTP,removeSessions } from "../Helper/SessionHelper.js";

const AxiosHeader = { headers: { token: getToken() } };

// Expense Summary
export const ExpenseSummary = async () => {
  try {
    store.dispatch(showLoader());
    let URL = BaseUrl + "/ExpenceSummary";
    let res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      return res.data["data"][0] || [];
    } else {
      ErrorToast("No Expense Summary Found");
      return [];
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something Went Wrong!");
    return [];
  }
};

// Sales Summary
export const SalesSummary = async () => {
  try {
    store.dispatch(showLoader());
    let URL = BaseUrl + "/SalesSummary";
    let res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      return res.data["data"][0] || [];
    } else {
      ErrorToast("No Sales Summary Found");
      return [];
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something Went Wrong!");
    return [];
  }
};

// Purchase Summary
export const PurchaseSummary = async () => {
  try {
    store.dispatch(showLoader());
    let URL = BaseUrl + "/PurchaseSummary";
    let res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      return res.data["data"][0] || [];
    } else {
      ErrorToast("No Purchase Summary Found");
      return [];
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something Went Wrong!");
    return [];
  }
};

// Return Summary
export const ReturnSummary = async () => {
  try {
    store.dispatch(showLoader());
    let URL = BaseUrl + "/ReturnSummary";
    let res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      return res.data["data"][0] || [];
    } else {
      ErrorToast("No Return Summary Found");
      return [];
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something Went Wrong!");
    return [];
  }
};
