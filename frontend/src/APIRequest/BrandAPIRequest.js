import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper.js";
import { getToken, setToken, setUserDetailsLocal,setEmail,setOTP,removeSessions } from "../Helper/SessionHelper.js";
import {setBrandList,setBrandListTotal} from "../Redux/State-Slice/BrandSlice.js";

const AxiosHeader = { headers: { token: getToken() } };

export const BrandList = async (pageNo, perPage, searchKeyword) => {
  try {
    store.dispatch(showLoader());
    let URL = `${BaseUrl}/BrandsList/${pageNo}/${perPage}/${searchKeyword}`;
    const result = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      const data = result.data["data"][0];
      if (data["Rows"].length > 0) {
        store.dispatch(setBrandList(data["Rows"]));
        store.dispatch(setBrandListTotal(data["Total"][0]["count"]));
      } else {
        store.dispatch(setBrandList([]));
        store.dispatch(setBrandListTotal(0));
      }
    } else {
      ErrorToast("Something went wrong!");
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
  }
};

// Brand Details by ID
export const BrandDetailsByID = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/BrandDetailsById/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      return res.data["data"][0];
    } else {
      ErrorToast("Data not found!");
      return null;
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
    return null;
  }
};

// Delete Brand
export const DeleteBrand = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DeleteBrand/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      SuccessToast("Brand Deleted Successfully");
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

// Update Brand
export const UpdateBrand = async (data) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/UpdateBrands/${data.id}`;
    const res = await axios.post(URL, data, AxiosHeader); // ✅ send body data
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      SuccessToast("Brand Updated Successfully");
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


// Create Brand
export const CreateBrand = async (formData) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/CreateBrands`;
    const res = await axios.post(URL, formData, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      SuccessToast("Brand Created Successfully");
      return true;
    } else {
      ErrorToast("Create Failed!");
      return false;
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
    return false;
  }
};

// Brand Dropdown
export const BrandDropDownList = async () => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/BrandsDropDown`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      return res.data["data"]; // returns array of {value, label}
    } else {
      ErrorToast("Brand dropdown load failed!");
      return [];
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
    return [];
  }
};
