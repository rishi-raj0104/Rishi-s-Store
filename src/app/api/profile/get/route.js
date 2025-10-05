import { isAuthenticated } from "@/lib/authentication";
import { connect } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import UserModel from "@/models/User.model";

export async function GET() {
  try {
    await connect();
    const auth = await isAuthenticated("user");
    if (!auth.isAuth) {
      return response(false, 401, "Unauthorized");
    }

    const userId = auth.userId;

   const user = await UserModel.findById(userId, "name email avatar phone").lean();
    if (!user) {
      return response(false, 404, "User not found.");
    }
    return response(true, 200, "Profile Data", user);
  } catch (error) {
    return catchError(error);
  }
}
