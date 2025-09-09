import OTPSModel from "../../model/Users/OTPSModel.js";
import SendEmailUtility from "../../utility/SendEmailUtility.js";

const userVerifyEmailService = async (req, DataModel) => {
  try {
    const email = req.params.email;
    let otpCode = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP

    // Check if user exists
    let userCount = await DataModel.aggregate([
      { $match: { email: email } },
      { $count: "total" }
    ]);

    if (userCount.length > 0) {
      // Save OTP to database
      await OTPSModel.create({ email: email, otp: otpCode });

      // Send OTP via email
      let sendEmail = await SendEmailUtility(
        email,
        `<h1>Your OTP Code: ${otpCode}</h1>`,
        "IMS - OTP Code"
      );

      return { status: "success", data: sendEmail };
    } else {
      return { status: "failed", data: "User not found" };
    }
  } catch (error) {
    return { status: "failed", data: error.toString() };
  }
};

export default userVerifyEmailService;
