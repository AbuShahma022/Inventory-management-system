import OTPSModel from "../../model/Users/OTPSModel.js";

const UserOtpverifyService = async (req, dataModel) => {
  try {
    const email = req.params.email;
    const otp = req.params.otp;

    const UNUSED = 0;   // OTP not used yet
    const USED = 1;     // OTP already verified

    // Check if OTP exists and is unused
    let otpCount = await OTPSModel.aggregate([
      { $match: { email: email, otp: otp, status: UNUSED } },
      { $count: "total" }
    ]);

    if (otpCount.length > 0) {
      // Update OTP status to "used"
      let otpUpdate = await OTPSModel.updateOne(
        { email: email, otp: otp },
        { status: USED }
      );

      return { status: "success", data: otpUpdate };
    } else {
      return { status: "failed", data: "Invalid or already used OTP" };
    }
  } catch (error) {
    return { status: "failed", data: error.toString() };
  }
};

export default UserOtpverifyService;
