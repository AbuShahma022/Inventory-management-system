import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper.js";
import { getToken, setToken, setUserDetailsLocal,setEmail,setOTP,removeSessions } from "../Helper/SessionHelper.js";
import { setExpenseTypeList,setExpenseTypeListTotal } from "../Redux/State-Slice/ExpenseTypeSlice.js";

const AxiosHeader = { headers: { token: getToken() } };

export const ExpenseTypeList = async (pageNo, perPage, searchKeyword) => {
  try {
    store.dispatch(showLoader());

    const URL = `${BaseUrl}/ExpenceTypeList/${pageNo}/${perPage}/${searchKeyword}`;
    const res = await axios.get(URL, AxiosHeader);

    store.dispatch(hideLoader());

    if (res.data["status"] === "success") {
      const data = res.data["data"][0];

      store.dispatch(setExpenseTypeList(data["Rows"] || []));
      store.dispatch(
        setExpenseTypeListTotal(
          data["Total"][0]?.["count"] ? data["Total"][0]["count"] : 0
        )
      );
    } else {
      ErrorToast("Failed to load Expense Type list");
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong while loading Expense Type list");
  }
};