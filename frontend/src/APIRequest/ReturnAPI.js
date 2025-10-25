import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast } from "../Helper/FormHelper.js";
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
