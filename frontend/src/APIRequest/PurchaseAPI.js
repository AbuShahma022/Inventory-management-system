import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper.js";
import { getToken, setToken, setUserDetailsLocal,setEmail,setOTP,removeSessions } from "../Helper/SessionHelper.js";
import { setPurchaseList,setPurchaseListTotal } from "../Redux/State-Slice/PurchaseSlice.js";

const AxiosHeader = { headers: { token: getToken() } };

export const PurchaseList = async (pageNo, perPage, searchKeyword) => {
  try {
    store.dispatch(showLoader());

    const URL = `${BaseUrl}/PurchaseList/${pageNo}/${perPage}/${searchKeyword}`;
    const res = await axios.get(URL, AxiosHeader);

    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      const rows = res.data.data[0]?.Rows || [];
      const total = res.data.data[0]?.Total[0]?.count || 0;

      store.dispatch(setPurchaseList(rows));
      store.dispatch(setPurchaseListTotal(total));
    } else {
      store.dispatch(setPurchaseList([]));
      store.dispatch(setPurchaseListTotal(0));
      ErrorToast("Failed to load purchase list!");
    }
  } catch (error) {
    store.dispatch(hideLoader());
    store.dispatch(setPurchaseList([]));
    store.dispatch(setPurchaseListTotal(0));
    ErrorToast(error.response?.data?.data || "Something went wrong!");
  }
};


export const PurchaseCreate = async (postBody) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/CreatePurchase`;
    const res = await axios.post(URL, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Purchase Created Successfully!");
      return true;
    } else {
      ErrorToast("Purchase Create Failed!");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast(error.response?.data?.data || "Something went wrong!");
    return false;
  }
};




export const PurchaseDelete = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DeletePurchase/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Purchase Deleted Successfully!");
      return true;
    } else {
      ErrorToast("Failed to Delete Purchase!");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast(error.response?.data?.data || "Something went wrong!");
    return false;
  }
};


export const PurchaseDetailsById = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DetailPurchase/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      return res.data.data[0]; 
    } else {
      ErrorToast("Purchase details not found!");
      return null;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast(error.response?.data?.data || "Something went wrong!");
    return null;
  }
};
