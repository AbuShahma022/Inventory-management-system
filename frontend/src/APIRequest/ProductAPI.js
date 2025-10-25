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
