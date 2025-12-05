import { connect } from "@/lib/db";
import { response, catchError, generateOTP } from "@/lib/helperFunction";
import  zSchema  from "@/lib/zodSchema";
import UserModel from "@/models/User.model";
import { z } from "zod";
import { SignJWT } from "jose";
import OtpModel from "@/models/Otp.model";
import { sendMail } from "@/lib/sendMail";
import { otpEmail } from "@/email/otpEmail";
import { emailVerificationLink } from "@/email/emailVerificationLink";
export async function POST(request) {
  try {
    await connect();
    const payload = await request.json();

    const validationSchema = zSchema
      .pick({
        email: true,
      })
      .extend({
        password: z.string(),
      });

    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(false, 401, "Invalid input", validatedData.error);
    }
    const { email, password } = validatedData.data;
    const getUser = await UserModel.findOne({ deletedAt: null , email }).select("+password");
    if (!getUser) {
      return response(false, 400, "Invalid login credentials");
    }
    if (!getUser.isEmailVerified) {
      const secret = new TextEncoder().encode(process.env.SECRET_KEY);
      const token = await new SignJWT({
        userId: getUser._id.toString(),
      })
        .setIssuedAt()
        .setExpirationTime("1h")
        .setProtectedHeader({ alg: "HS256" })
        .sign(secret);

      const mailStatus = await sendMail(
        "Email Verification",
        email,
        emailVerificationLink(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`
        )
      );
      return response(
        false,
        401,
        "Your email is not verified ,We have send you a verification link to your registered email address"
      );
    }
    const isPasswordVerified = await getUser.comparePassword(password);
    if (!isPasswordVerified) {
      return response(false, 400, "Invalid login credentials");
    }

    await OtpModel.deleteMany({ email });
    const otp = generateOTP();

    const newOtpData = new OtpModel({
      email,
      otp,
    });

    await newOtpData.save();

    const OtpEmailSend = await sendMail(
      "Your Login verification Otp",
      email,
      otpEmail(otp)
    );
    if (!OtpEmailSend) {
      return response(false, 400, "Failed to send otp ,Please try again later");
    }
    return response(true, 200, "Please verify your device");
  } catch (error) {
    return catchError(error);
  }
}
