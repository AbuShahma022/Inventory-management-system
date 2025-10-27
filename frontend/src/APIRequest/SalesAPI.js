import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper.js";
import { getToken, setToken, setUserDetailsLocal,setEmail,setOTP,removeSessions } from "../Helper/SessionHelper.js";
import { setSalesList,setSalesListTotal } from "../Redux/State-Slice/SalesSlice.js";

const AxiosHeader = { headers: { token: getToken() } };

export const SalesList = async (pageNo, perPage, searchKeyword) => {
  try {
    store.dispatch(showLoader());

    const URL = `${BaseUrl}/SalesList/${pageNo}/${perPage}/${searchKeyword}`;
    const res = await axios.get(URL, AxiosHeader);

    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      const rows = res.data.data[0]?.Rows || [];
      const total = res.data.data[0]?.Total[0]?.count || 0;

      store.dispatch(setSalesList(rows));
      store.dispatch(setSalesListTotal(total));
    } else {
      store.dispatch(setSalesList([]));
      store.dispatch(setSalesListTotal(0));
      ErrorToast("Failed to load sales list!");
    }
  } catch (error) {
    store.dispatch(hideLoader());
    store.dispatch(setSalesList([]));
    store.dispatch(setSalesListTotal(0));
    ErrorToast(error.response?.data?.data || "Something went wrong!");
  }
};


export const SalesCreate = async (postBody) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/CreateSales`;
    const res = await axios.post(URL, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Sales Created Successfully!");
      return true;
    } else {
      ErrorToast("Sales Create Failed!");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast(error.response?.data?.data || "Something went wrong!");
    return false;
  }
};




export const SalesDelete = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DeleteSales/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Sales Deleted Successfully!");
      return true;
    } else {
      ErrorToast("Failed to Delete Sales!");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast(error.response?.data?.data || "Something went wrong!");
    return false;
  }
};


export const SalesDetailsById = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DetailSales/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      return res.data.data[0]; 
    } else {
      ErrorToast("Sales details not found!");
      return null;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast(error.response?.data?.data || "Something went wrong!");
    return null;
  }
};
