import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper.js";
import { getToken, setToken, setUserDetailsLocal,setEmail,setOTP,removeSessions } from "../Helper/SessionHelper.js";
import { setCategoryList,setCategoryListTotal } from "../Redux/State-Slice/CategorySlice.js";

const AxiosHeader = { headers: { token: getToken() } };

export const CategoryAPI = async (pageNo, perPage, searchKeyword) => {
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