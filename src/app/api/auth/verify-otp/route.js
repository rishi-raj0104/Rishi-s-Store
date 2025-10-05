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

    const loggedInUserData = {
      _id: getUser._id.toString(),
      role: getUser.role,
      name: getUser.name,
      avatar: getUser.avatar,
    };

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT(loggedInUserData)
      .setIssuedAt()
      .setExpirationTime("24h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    const cookieStore = await cookies();

    cookieStore.set({
      name: "access_token",
      value: token,
      httpOnly: process.env.NODE_ENV === "production",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    await getOtpData.deleteOne();

    return response(true, 200, "Login successfull.",loggedInUserData);
  } catch (error) {
    return catchError(error);
  }
}
