import { isAuthenticated } from "@/lib/authentication";
import { connect } from "@/lib/db";

import { catchError, response } from "@/lib/helperFunction";
import OrderModel from "@/models/Order.model";
import ReviewModel from "@/models/Rating.model";

export async function GET() {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }
    await connect();
    const latestReview = await ReviewModel.find({ deletedAt: null })
      .sort({ createdAt: -1 })
      .populate({
        path: "product",
        select: "name media",
        populate: {
          path: "media",
          select: "secure_url",
        },
      });

    return response(true, 200, "Latest review", latestReview);
  } catch (error) {
    return catchError(error);
  }
}
