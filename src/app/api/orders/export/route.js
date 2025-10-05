import { isAuthenticated } from "@/lib/authentication";
import { connect } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import OrderModel from "@/models/Order.model";

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

    const getOrders = await OrderModel.find(filter)
      .select("-products")
      .sort({ createdAt: -1 })
      .lean();

    if (!getOrders) {
      return response(false, 404, "Collection empty.");
    }

    return response(true, 200, "Data found.", getOrders);
  } catch (error) {
    return catchError(error);
  }
}
