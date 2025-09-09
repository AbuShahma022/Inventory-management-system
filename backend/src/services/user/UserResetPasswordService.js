import OTPSModel from "../../model/Users/OTPSModel.js";

const UserResetPasswordService = async (req, DataModel) => {
  const email = req.body["email"];
  const otp = req.body["otp"];
  const newPass = req.body["password"];
  const statusUpdate = 1;

  try {
    // Check OTP validity
    let otpUsedCount = await OTPSModel.aggregate([
      { $match: { email: email, otp: otp, status: statusUpdate } },
      { $count: "total" }
    ]);

    if (otpUsedCount.length > 0) {
      // Update password directly (plain text)
      let passwordUpdate = await DataModel.updateOne(
        { email: email },
        { password: newPass }
      );

      // Mark OTP as used
      await OTPSModel.updateOne(
        { email: email, otp: otp },
        { status: 0 } // OTP used
      );

      return { status: "success", data: passwordUpdate };
    } else {
      return { status: "failed", data: "Invalid or expired OTP" };
    }
  } catch (error) {
    return { status: "failed", data: error.toString() };
  }
};

export default UserResetPasswordService;
