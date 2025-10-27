import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper.js";
import { getToken, setToken, setUserDetailsLocal,setEmail,setOTP,removeSessions } from "../Helper/SessionHelper.js";

const AxiosHeader = { headers: { token: getToken() } };

// Expense Report
export const ExpenseReport = async (fromDate, toDate) => {
    try {
        store.dispatch(showLoader());
        let body = {
            fromDate: new Date(fromDate).toISOString(),
            toDate: new Date(toDate).toISOString()
        };

        let res = await axios.post(`${BaseUrl}/ExpenseByDate`, body, AxiosHeader);
        store.dispatch(hideLoader());

        if(res.data["Status"]==="success"){
            return res.data["data"];
        } else {
            ErrorToast("No Data Found");
            return [];
        }
    } catch (e) {
        store.dispatch(hideLoader());
        ErrorToast("Something Went Wrong");
        return [];
    }
};

// Purchase Report
export const PurchaseReport = async (fromDate, toDate) => {
  try {
    store.dispatch(showLoader());
    let URL = BaseUrl + "/PurchaseByDate";

       let body = {
            fromDate: new Date(fromDate).toISOString(),
            toDate: new Date(toDate).toISOString()
        };
    let res = await axios.post(URL, body, AxiosHeader);

    store.dispatch(hideLoader());

    if (res.data["Status"] === "success") {
      return res.data["data"];
    } else {
      ErrorToast("No Purchase Data Found");
      return [];
    }

  } catch (e) {
    store.dispatch(hideLoader());

    ErrorToast("Something Went Wrong!");
    return [];
  }
};

// Sales Report
export const SalesReport = async (fromDate, toDate) => {
  try {
    store.dispatch(showLoader());
    let URL = BaseUrl + "/SalesByDate";

    let postBody =  {
            fromDate: new Date(fromDate).toISOString(),
            toDate: new Date(toDate).toISOString()
        };
    let res = await axios.post(URL, postBody, AxiosHeader);

    store.dispatch(hideLoader());

    if (res.data["Status"] === "success") {
      return res.data["data"];
    } else {
      ErrorToast("No Sales Data Found");
      return [];
    }

  } catch (e) {
    store.dispatch(hideLoader());
    if (e.response && e.response.status === 401) removeSessions();
    ErrorToast("Something Went Wrong!");
    return [];
  }
};

// Return Report
export const ReturnReport = async (fromDate, toDate) => {
  try {
    store.dispatch(showLoader());
    let URL = BaseUrl + "/ReturnByDate";

    let postBody = {
            fromDate: new Date(fromDate).toISOString(),
            toDate: new Date(toDate).toISOString()
        };
    let res = await axios.post(URL, postBody, AxiosHeader);

    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      return res.data["data"];
    } else {
      ErrorToast("No Return Data Found");
      return [];
    }

  } catch (e) {
    store.dispatch(hideLoader());
    if (e.response && e.response.status === 401) removeSessions();
    ErrorToast("Something Went Wrong!");
    return [];
  }
};