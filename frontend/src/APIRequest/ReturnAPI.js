import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper.js";
import { getToken } from "../Helper/SessionHelper.js";
import { setlist, setlistTotal } from "../Redux/State-Slice/ReturnSlice.js";

const AxiosHeader = { headers: { token: getToken() } };

export const ReturnList = async (pageNo, perPage, searchKeyword) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/ReturnList/${pageNo}/${perPage}/${searchKeyword}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      store.dispatch(setlistTotal(res.data["data"][0]["Total"][0]["count"]));
      store.dispatch(setlist(res.data["data"][0]["Rows"]));
    } else {
      ErrorToast("Something went wrong!");
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
  }
};


export const ReturnCreate = async (postBody) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/CreateReturn`;
    const res = await axios.post(URL, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Return Created Successfully!");
      return true;
    } else {
      ErrorToast("Return Create Failed!");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast(error.response?.data?.data || "Something went wrong!");
    return false;
  }
};




export const ReturnDelete = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DeleteReturn/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Return Deleted Successfully!");
      return true;
    } else {
      ErrorToast("Failed to Delete Return!");
      return false;
    }
  } catch (error) {
    
    store.dispatch(hideLoader());
    ErrorToast(error.response?.data?.data || "Something went wrong! ");
    return false;
  }
};


export const ReturnDetailsById = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DetailReturn/${id}`;
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

