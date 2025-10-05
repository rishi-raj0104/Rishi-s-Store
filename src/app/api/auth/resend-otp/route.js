import { connect } from "@/lib/db";
import { catchError, response, generateOTP } from "@/lib/helperFunction";
import  zSchema  from "@/lib/zodSchema";
import UserModel from "@/models/User.model";
import OTPModel from "@/models/Otp.model";
import { sendMail } from "@/lib/sendMail";
import { otpEmail } from "@/email/otpEmail";

export async function POST(request) {
  try {
    await connect();

    const payload = await request.json();
    const validationSchema = zSchema.pick({ email: true });
    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(false, 400, "Invalid email format.");
    }

    const { email } = validatedData.data;

    // Check if user exists
    const getUser = await UserModel.findOne({ email });
    if (!getUser) {
      return response(false, 404, "User not found.");
    }

    // Remove previous OTPs
    await OTPModel.deleteMany({ email });

    // Generate new OTP
    const otp = generateOTP();

    // Save OTP in DB
    await new OTPModel({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // optional: 5 mins expiry
    }).save();

    // Send OTP email
    const otpSendStatus = await sendMail(
      "Your login verification code.",
      email,
      otpEmail(otp)
    );

    if (!otpSendStatus.success) {
      return response(false, 400, "Failed to resend OTP.");
    }

    return response(true, 200, "OTP sent successfully.");
  } catch (error) {
    return catchError(error);
  }
}
