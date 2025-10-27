import OTPSModel from "../../model/Users/OTPSModel.js";

const UserOtpverifyService = async (req, dataModel) => {
  try {
    let email = req.params.email;
    let otp = req.params.otp;
    let UNUSED = 0;
    let USED = 1;

    // Check OTP exists and unused
    let OTPCount = await OTPSModel.aggregate([
      { $match: { email: email, otp: otp, status: UNUSED } },
      { $count: "total" }
    ]);

    if (OTPCount.length > 0) {

      // Update status from unused to used
      let OTPUpdate = await OTPSModel.updateOne(
        { email: email, otp: otp, status: UNUSED },
        { status: USED },
        { upsert: true }

        
      );

      

      return { status: "success", data: OTPUpdate };

    } else {
      return { status: "fail", data: "Invalid OTP Code" };
    }

  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

export default UserOtpverifyService;
