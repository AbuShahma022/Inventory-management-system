import DataModel from "../../model/Users/UsersModel.js";
import OTPModel from "../../model/Users/OTPSModel.js";

import userCreateService from "../../services/user/UserCreateService.js";
import userLoginService from "../../services/user/UserLoginService.js";
import userDetailService from "../../services/user/UserDetailService.js";
import userUpdateService from "../../services/user/UserUpdateService.js";
import userResetPassService from "../../services/user/UserResetPasswordService.js";
import userVerifyEmailService from "../../services/user/UserVerifyEmailService.js";
import userVerifyOTPService from "../../services/user/UserVerifyOtpService.js";

// Registration
const Registration = async (req, res) => {
  
  let result = await userCreateService(req, DataModel);
  res.status(200).json(result);
};

// Login
const UserLogin = async (req, res) => {
  
  let result = await userLoginService(req, DataModel);
  res.status(200).json(result);
};

// Details
const UserDetails = async (req, res) => {
  let result = await userDetailService(req, DataModel);
  res.status(200).json(result);
};

// Update
const UpdateUser = async (req, res) => {
  let result = await userUpdateService(req, DataModel);
  res.status(200).json(result);
};

// Reset Password
const ResetPassword = async (req, res) => {
  let result = await userResetPassService(req, DataModel);
  res.status(200).json(result);
};

// Verify Email
const VerifyEmail = async (req, res) => {
  let result = await userVerifyEmailService(req, DataModel);
  res.status(200).json(result);
};

// Verify OTP
const VerifyOTP = async (req, res) => {
  let result = await userVerifyOTPService(req, OTPModel);
  res.status(200).json(result);
};

export {
  Registration,
  UserLogin,
  UserDetails,
  UpdateUser,
  ResetPassword,
  VerifyEmail,
  VerifyOTP
};
