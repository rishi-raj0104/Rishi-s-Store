import UserModel from "@/models/User.model";
import { jwtVerify } from "jose";
import { response, catchError } from "@/lib/helperFunction";
import { connect } from "@/lib/db";

export async function POST(request) {
  try {
    await connect();
    const { token } = await request.json();

    if (!token) {
      return response(false, 400, "Missing token.");
    }

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const decoded = await jwtVerify(token, secret);
    const userId = decoded.payload.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return response(false, 404, "User not found.");
    }
    if (user.isEmailVerified) {
      return response(true, 200, "Email already verified.");
    }
    user.isEmailVerified = true;
    await user.save();

    return response(true, 200, "Email verified successfully.");
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
