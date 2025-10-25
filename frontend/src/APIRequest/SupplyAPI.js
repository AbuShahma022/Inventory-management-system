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