import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper.js";
import { getToken, setToken, setUserDetailsLocal,setEmail,setOTP,removeSessions } from "../Helper/SessionHelper.js";
import { setCustomerList,setCustomerListTotal } from "../Redux/State-Slice/CustomerSlice.js";

const AxiosHeader = { headers: { token: getToken() } };

export const CustomerList = async (pageNo, perPage, searchKeyword) => {
  try {
    store.dispatch(showLoader());

    // Default to "0" when no keyword is given
    if (!searchKeyword || searchKeyword.trim() === "") {
      searchKeyword = 0;
    }

    const URL = `${BaseUrl}/CustomerList/${pageNo}/${perPage}/${searchKeyword}`;
    const res = await axios.get(URL, AxiosHeader);

    store.dispatch(hideLoader());

    if (res.data.status === "success") {
      const data = res.data.data[0];
      const rows = data?.Rows || [];
      const total = data?.Total?.[0]?.count || 0;

      store.dispatch(setCustomerList(rows));
      store.dispatch(setCustomerListTotal(total));

      return true;
    } else {
      ErrorToast("Failed to load customer list");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    console.error("CustomerList Error:", error);
    ErrorToast("Something went wrong while fetching customers");
    return false;
  }
};

export const CustomerDetailsByID = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DetailByIdCustomer/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      return res.data["data"][0];
    } else {
      ErrorToast("Customer not found!");
      return null;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
    return null;
  }
};


export const CustomerCreate = async (postBody) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/CreateCustomer`;
    const res = await axios.post(URL, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      SuccessToast("Customer Created Successfully");
      return true;
    } else {
      ErrorToast("Create Failed!");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
    return false;
  }
};


export const CustomerUpdate = async (id, postBody) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/UpdateCustomer/${id}`;
    const res = await axios.post(URL, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      SuccessToast("Customer Updated Successfully");
      return true;
    } else {
      ErrorToast("Update Failed!");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
    return false;
  }
};


export const CustomerDelete = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DeleteCustomer/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      SuccessToast("Customer Deleted Successfully");
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


export const CustomerDropdownList = async () => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/CustomerDropDown`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      return res.data["data"];
    } else {
      ErrorToast("Failed to load dropdown data");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
    return false;
  }
};