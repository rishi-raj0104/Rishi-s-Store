import { isAuthenticated } from "@/lib/authentication";
import { connect } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import UserModel from "@/models/User.model";

export async function GET(request, { params }) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }

    await connect();

    const filter = {
      deletedAt: null,
    };

    const getCustomers = await UserModel.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    if (!getCustomers) {
      return response(false, 404, "Collection empty.");
    }

    return response(true, 200, "Data found.", getCustomers);
  } catch (error) {
    return catchError(error);
  }
}
