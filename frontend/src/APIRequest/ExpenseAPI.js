import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper.js";
import { getToken, setToken, setUserDetailsLocal,setEmail,setOTP,removeSessions } from "../Helper/SessionHelper.js";
import { setExpenseList,setExpenseListTotal } from "../Redux/State-Slice/ExpenseSlice.js";
const AxiosHeader = { headers: { token: getToken() } };


export const ExpenseList = async (pageNo, perPage, searchKeyword) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/ExpenseList/${pageNo}/${perPage}/${searchKeyword}`;
    const res = await axios.get(URL, AxiosHeader);

    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      const list = res.data["data"][0]["Rows"];
      const total = res.data["data"][0]["Total"][0]["count"];
      store.dispatch(setExpenseList(list));
      store.dispatch(setExpenseListTotal(total));
    } else {
      ErrorToast("Failed to load expense list");
    }
  } catch (e) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong while fetching expense list");
  }
};
