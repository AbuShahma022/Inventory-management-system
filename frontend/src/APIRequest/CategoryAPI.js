import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper.js";
import { getToken, setToken, setUserDetailsLocal,setEmail,setOTP,removeSessions } from "../Helper/SessionHelper.js";
import { setCategoryList,setCategoryListTotal } from "../Redux/State-Slice/CategorySlice.js";

const AxiosHeader = { headers: { token: getToken() } };

export const CategoryListAPI = async (pageNo, perPage, searchKeyword) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/CategoryList/${pageNo}/${perPage}/${searchKeyword}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      const data = res.data.data[0];
      if (data.Rows.length > 0) {
        store.dispatch(setCategoryList(data.Rows));
        store.dispatch(setCategoryListTotal(data.Total[0]?.count || 0));
      } else {
        store.dispatch(setCategoryList([]));
        store.dispatch(setCategoryListTotal(0));
      }
    } else {
      ErrorToast("Failed to load category list!");
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast(error.response?.data?.data || "Something went wrong!");
  }
};

// ✅ Get Category Details by ID
export const CategoryDetailsByID = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DetailByIdCategory/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data.status === "success") {
      return res.data.data[0];
    } else {
      ErrorToast("Category not found!");
      return null;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
    return null;
  }
};


// ✅ Create Category
export const CategoryCreate = async (postBody) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/CreateCategory`;
    const res = await axios.post(URL, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data.status === "success") {
      SuccessToast("Category Created Successfully");
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


// ✅ Update Category
export const CategoryUpdate = async (id, postBody) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/UpdateCategory/${id}`;
    const res = await axios.post(URL, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data.status === "success") {
      SuccessToast("Category Updated Successfully");
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


// ✅ Delete Category
export const CategoryDelete = async (id) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/DeleteCategory/${id}`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.data.status === "success") {
      SuccessToast("Category Deleted Successfully");
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


// ✅ Dropdown Category List
export const CategoryDropDown = async () => {
  try {
    const URL = `${BaseUrl}/CategoryDropDown`;
    const res = await axios.get(URL, AxiosHeader);

    if (res.data.status === "success") {
      return res.data.data;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};