import { BaseUrl } from "../Helper/Config.js";
import axios from "axios";
import { showLoader, hideLoader } from "../Redux/State-Slice/LoaderSlice.js";
import store from "../Redux/Store/store.js";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper.js";
import { getToken, setToken, setUserDetailsLocal,setEmail,setOTP,removeSessions } from "../Helper/SessionHelper.js";
import { setUserDetails } from "../Redux/State-Slice/UserDetailsSlice.js";
import { setProfile } from "../Redux/State-Slice/ProfileSlice.js";

const AxiosHeader = { headers: { token: getToken() } };

// ✅ Register
export const UserRegister = async (email, firstName, lastName, mobile, password, photo) => {
  try {
    store.dispatch(showLoader());
    const response = await axios.post(`${BaseUrl}/register`, {
      email,
      firstname: firstName,
      lastname: lastName,
      mobile,
      password,
      photo,
    });
    store.dispatch(hideLoader());

    if (response.data.status === "success") {
      SuccessToast("Registration successful!");
      return true;
    } else {
      ErrorToast(response.data.data || "Registration failed!");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast(error.response?.data?.data || "Something went wrong!");
    return false;
  }
};

// ✅ Login
export const UserLogin = async (email, password) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/login`;
    const res = await axios.post(URL, { email, password });

    const token = res.data["token"];
    const userData = res.data["data"][0];

    if (!token || !userData) {
      throw new Error("Invalid login response format");
    }

    // Save token
    setToken(token);

    // ✅ Save user details to localStorage
    setUserDetailsLocal(userData);

    // ✅ Also update Redux store
    store.dispatch(setUserDetails(userData));

    SuccessToast("Login Successful!");
    store.dispatch(hideLoader());
    return true;
  } catch (error) {
    store.dispatch(hideLoader());
    console.error("Login error:", error);
    ErrorToast(error.response?.data?.data || "Something went wrong!");
    return false;
  }
};


// ✅ Fetch user details and save to Redux only
export const UserDetails = async () => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/details`;
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data?.data?.[0]) {
      const userData = res.data.data[0];

      // Update both slices
      store.dispatch(setProfile(userData));
      store.dispatch(setUserDetails(userData));

      return true;
    } else {
      ErrorToast("Failed to fetch user details!");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast("Something went wrong!");
    return false;
  }
};

// ✅ Update profile and sync Redux automatically
export const ProfileUpdate = async (firstName, lastName, password, mobile, photo) => {
  try {
    store.dispatch(showLoader());
    const URL = `${BaseUrl}/update`;

    let PostBody = {};
    if (firstName?.trim()) PostBody.firstname = firstName;
    if (lastName?.trim()) PostBody.lastname = lastName;
    if (mobile?.trim()) PostBody.mobile = mobile;
    if (photo?.trim()) PostBody.photo = photo;
    if (password?.trim()) PostBody.password = password;

    if (Object.keys(PostBody).length === 0) {
      store.dispatch(hideLoader());
      ErrorToast("No changes to update!");
      return false;
    }

    const res = await axios.post(URL, PostBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Profile updated successfully!");

      // Refresh user data in store
      await UserDetails();

      return true;
    } else {
      ErrorToast(res.data.data || "Something went wrong!");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast(error.response?.data?.data || "Something went wrong!");
    return false;
  }
};

export const RecoverVerifyEmail = async (email) => {
  try {
    store.dispatch(showLoader());

    // ✅ Email sent as param
    const URL = `${BaseUrl}/verify-email/${email}`;
    const res = await axios.get(URL); 

    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Verification code sent to your email!");
      setEmail(email); // ✅ Save email to localStorage
      return true;
    } else {
      ErrorToast(res.data.data || "Email verification failed!");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast(error.response?.data?.data || "Something went wrong!");
    return false;
  }
};


export const RecoverVerifyOtp = async (email, otp) => {
  try {
    store.dispatch(showLoader());

    // ✅ API call with params
    const URL = `${BaseUrl}/verify-otp/${email}/${otp}`;
    const res = await axios.get(URL); 

    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("OTP verified successfully!");

      // ✅ Save OTP to session for next step
      setOTP(otp);

      return true;
    } else {
      ErrorToast(res.data.data || "Invalid OTP!");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    ErrorToast(error.response?.data?.data || "Something went wrong!");
    return false;
  }
};

export const ResetPassword = async (email, otp, newPassword) => {
  try {
    store.dispatch(showLoader());

    const URL = `${BaseUrl}/reset-password`;
    const PostBody = { email: email, otp: otp, password: newPassword }; // adjust if backend expects different key names
    const res = await axios.post(URL, PostBody);

    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Password reset successfully!");
      return true;
      removeSessions()

    } else {
      ErrorToast(res.data.data || "Password reset failed!");
      return false;
    }
  } catch (error) {
    store.dispatch(hideLoader());
    console.error("ResetPassword error:", error);
    ErrorToast(error.response?.data?.data || "Something went wrong!");
    return false;
  }
};
