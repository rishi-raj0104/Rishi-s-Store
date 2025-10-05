import { response, catchError } from "@/lib/helperFunction";
import { connect } from "@/lib/db";
import zSchema from "@/lib/zodSchema";
import OtpModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
export async function POST(request) {
  try {
    await connect();
    const payload = await request.json();
    const validateSchema = zSchema.pick({
      otp: true,
      email: true,
    });

    const validatedData = validateSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(false, 401, "Invalid or missing input.");
    }

    const { email, otp } = validatedData.data;

    const getOtpData = await OtpModel.findOne({ email, otp });

    if (!getOtpData) {
      return response(false, 404, "Invalid or expired otp");
    }

    const getUser = await UserModel.findOne({ deletedAt: null, email }).lean();
    if (!getUser) {
      return response(false, 404, "User not found.");
    }

    await getOtpData.deleteOne();

    return response(true, 200, "Otp Verified.");
  } catch (error) {
    return catchError(error);
  }
}
