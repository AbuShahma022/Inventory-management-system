import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper.js";
import { getToken, setToken, setUserDetailsLocal,setEmail,setOTP,removeSessions } from "../Helper/SessionHelper.js";
import { setExpenseTypeList,setExpenseTypeListTotal } from "../Redux/State-Slice/ExpenseTypeSlice.js";

const AxiosHeader = { headers: { token: getToken() } };

export const ExpenseTypeList = async (pageNo, perPage, searchKeyword) => {
  try {
    store.dispatch(showLoader());

    const URL = `${BaseUrl}/ExpenceTypeList/${pageNo}/${perPage}/${searchKeyword}`;
    const res = await axios.get(URL, AxiosHeader);

    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      const data = res.data["data"][0];

      store.dispatch(setExpenseTypeList(data["Rows"] || []));
      store.dispatch(
        setExpenseTypeListTotal(
          data["Total"][0]?.["count"] ? data["Total"][0]["count"] : 0
        )
      );
    } else {
      ErrorToast("Failed to load Expense Type list");
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong while loading Expense Type list");
  }
};

// CREATE
export const ExpenseTypeCreate = async (postBody) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/CreateExpenceType`;
    const res = await axios.post(URL, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data.status === "success") {
      SuccessToast("Expense Type Created Successfully");
      return true;
    } else {
      ErrorToast("Creation Failed!");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast(error.response?.data?.data || "Something went wrong");
    return false;
  }
};

// DETAILS BY ID
export const ExpenseTypeDetailsByID = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DetailByIdExpenceType/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data.status === "success") {
      return res.data.data[0];
    } else {
      ErrorToast("Data Not Found!");
      return null;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong while fetching data!");
    return null;
  }
};

// UPDATE
export const ExpenseTypeUpdate = async (id, postBody) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/UpdateExpenceType/${id}`;
    const res = await axios.post(URL, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data.status === "success") {
      SuccessToast("Expense Type Updated Successfully");
      return true;
    } else {
      ErrorToast("Update Failed!");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast(error.response?.data?.data || "Something went wrong");
    return false;
  }
};

// DELETE
export const ExpenseTypeDelete = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DeleteExpenceType/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data.status === "success") {
      SuccessToast("Deleted Successfully");
      return true;
    } else {
      ErrorToast("Delete Failed!");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
    return false;
  }
};

// DROPDOWN LIST
export const ExpenseTypeDropdownList = async () => {
  try {
    const URL = `${BaseUrl}/ExpenceTypeDropDown`;
    const res = await axios.get(URL, AxiosHeader);

    if (res.data.status === "success") {
      return res.data.data;
    } else {
      ErrorToast("Dropdown Load Failed!");
      return [];
    }
  } catch (error) {
    ErrorToast("Something went wrong!");
    return [];
  }
};
