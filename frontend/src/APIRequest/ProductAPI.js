import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper.js";
import { getToken, setToken, setUserDetailsLocal,setEmail,setOTP,removeSessions } from "../Helper/SessionHelper.js";
import { setProductList,setProductListTotal } from "../Redux/State-Slice/ProductSlice.js";

const AxiosHeader = { headers: { token: getToken() } };
export const ProductList = async (pageNo, perPage, searchKeyword) => {
  try {
    store.dispatch(showLoader());

    const URL = `${BaseUrl}/ProductList/${pageNo}/${perPage}/${searchKeyword}`;
    const res = await axios.get(URL, AxiosHeader);

    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      const rows = res.data.data[0]?.Rows || [];
      const total = res.data.data[0]?.Total[0]?.count || 0;

      store.dispatch(setProductList(rows));
      store.dispatch(setProductListTotal(total));
    } else {
      store.dispatch(setProductList([]));
      store.dispatch(setProductListTotal(0));
      ErrorToast("Failed to load product list!");
    }
  } catch (error) {
    store.dispatch(hideLoader());
    store.dispatch(setProductList([]));
    store.dispatch(setProductListTotal(0));
    ErrorToast(error.response?.data?.data || "Something went wrong!");
  }
};

export const ProductCreate = async (postBody) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/CreateProduct`;
    const res = await axios.post(URL, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      SuccessToast("Product Created Successfully");
      return true;
    } else {
      ErrorToast("Product Create Failed");
      return false;
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
    return false;
  }
};


export const ProductUpdate = async (id, postBody) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/UpdateProduct/${id}`;
    const res = await axios.post(URL, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      SuccessToast("Product Updated Successfully");
      return true;
    } else {
      ErrorToast("Update Failed!");
      return false;
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
    return false;
  }
};


export const ProductDelete = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DeleteProduct/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      SuccessToast("Product Deleted Successfully");
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


export const ProductDetailsById = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DetailProduct/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      return res.data["data"][0];
    } else {
      ErrorToast("Product Details Not Found");
      return null;
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
    return null;
  }
};

export const ProductDropDownList = async () => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/ProductDropDown`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());
    if (res.status === 200 && res.data.status === "success") {
      return res.data.data;
    } else {
      ErrorToast("Product list not found!");
      return [];
    }
    
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast(error.response?.data?.data || "Something went wrong!");
    return [];
    
  }
}
