import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper.js";
import { getToken, setToken, setUserDetailsLocal,setEmail,setOTP,removeSessions } from "../Helper/SessionHelper.js";
import { setExpenseList,setExpenseListTotal } from "../Redux/State-Slice/ExpenseSlice.js";
const AxiosHeader = { headers: { token: getToken() } };


export const ExpenseList = async (pageNo, perPage, searchKeyword) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/ExpenseList/${pageNo}/${perPage}/${searchKeyword}`;
    const res = await axios.get(URL, AxiosHeader);

    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      const list = res.data["data"][0]["Rows"];
      const total = res.data["data"][0]["Total"][0]["count"];
      store.dispatch(setExpenseList(list));
      store.dispatch(setExpenseListTotal(total));
    } else {
      ErrorToast("Failed to load expense list");
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong while fetching expense list");
  }
};

export const ExpenseCreate = async (postBody) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/CreateExpense`;
    const res = await axios.post(URL, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      SuccessToast("Expense Created Successfully");
      return true;
    } else {
      ErrorToast("Expense Creation Failed");
      return false;
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong while creating expense");
    return false;
  }
};

export const ExpenseUpdate = async (id, postBody) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/UpdateExpense/${id}`;
    const res = await axios.post(URL, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      SuccessToast("Expense Updated Successfully");
      return true;
    } else {
      ErrorToast("Expense Update Failed");
      return false;
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong while updating expense");
    return false;
  }
};

export const ExpenseDetailsByID = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/ExpenseDetailById/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      return res.data["data"][0];
    } else {
      ErrorToast("Failed to load Expense Details");
      return null;
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong while fetching Expense details");
    return null;
  }
};

export const ExpenseDelete = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DeleteExpense/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      SuccessToast("Expense Deleted Successfully");
      return true;
    } else {
      ErrorToast("Expense Deletion Failed");
      return false;
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong while deleting expense");
    return false;
  }
};
