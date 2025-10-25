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