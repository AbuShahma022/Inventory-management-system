import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper.js";
import { getToken, setToken, setUserDetailsLocal,setEmail,setOTP,removeSessions } from "../Helper/SessionHelper.js";
import { data } from "react-router-dom";

const AxiosHeader = { headers: { token: getToken() } };

export const AiAgent = async (message) => {
  try {
   // store.dispatch(showLoader());

    let URL = BaseUrl + "/Chat";
    let res = await axios.post(URL, { message: message }, AxiosHeader);
    

    //store.dispatch(hideLoader());

    if (res.data?.success === true) {
      return res.data["reply"]; // reply message from AI
    } else {
        
      ErrorToast("AI could not process your request");
      return "";
    }

  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong with AI!");
    return "";
  }
};
