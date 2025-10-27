import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper.js";
import { getToken, setToken, setUserDetailsLocal,setEmail,setOTP,removeSessions } from "../Helper/SessionHelper.js";
import { setSupplyList,setSupplyListTotal } from "../Redux/State-Slice/SupplySlice.js";

const AxiosHeader = { headers: { token: getToken() } };

export const SupplyList = async (pageNo, perPage, searchKeyword) => {
  try {
    store.dispatch(showLoader());

    const URL = `${BaseUrl}/SupplierList/${pageNo}/${perPage}/${searchKeyword}`;
    const result = await axios.get(URL, AxiosHeader);

    store.dispatch(hideLoader());

    if (result.status === 200 && result.data.status === "success") {
      const rows = result.data.data[0]?.Rows || [];
      const total = result.data.data[0]?.Total[0]?.count || 0;

      store.dispatch(setSupplyList(rows));
      store.dispatch(setSupplyListTotal(total));
    } else {
      ErrorToast(result.data.data || "Failed to load suppliers!");
      store.dispatch(setSupplyList([]));
      store.dispatch(setSupplyListTotal(0));
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast(error.response?.data?.data || "Something went wrong!");
    store.dispatch(setSupplyList([]));
    store.dispatch(setSupplyListTotal(0));
  }
};

// ✅ Create Supplier
export const SupplyCreate = async (postBody) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/CreateSupplier`;
    const res = await axios.post(URL, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data.status === "success") {
      SuccessToast("Supplier Created Successfully");
      return true;
    } else {
      ErrorToast("Supplier Create Failed!");
      return false;
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
    return false;
  }
};


// ✅ Supplier Details by ID
export const SupplyDetailsByID = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DetailSupplier/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data.status === "success") {
      return res.data.data[0];
    } else {
      ErrorToast("Supplier Not Found!");
      return false;
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
    return false;
  }
};


// ✅ Update Supplier
export const SupplyUpdate = async (id, postBody) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/UpdateSupplier/${id}`;
    const res = await axios.post(URL, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data.status === "success") {
      SuccessToast("Supplier Updated Successfully");
      return true;
    } else {
      ErrorToast("Supplier Update Failed!");
      return false;
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
    return false;
  }
};


// ✅ Delete Supplier
export const SupplyDelete = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DeleteSupplier/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data.status === "success") {
      SuccessToast("Supplier Deleted Successfully");
      return true;
    } else {
      ErrorToast("Delete Failed!");
      return false;
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
    return false;
  }
};


// ✅ Supplier Dropdown List
export const SupplyDropDownList = async () => {
  try {
    const URL = `${BaseUrl}/SupplierDropDown`;
    const res = await axios.get(URL, AxiosHeader);

    if (res.data.status === "success") {
      return res.data.data;
    } else {
      ErrorToast("Dropdown Load Failed!");
      return false;
    }
  } catch (e) {
    ErrorToast("Something went wrong!");
    return false;
  }
};