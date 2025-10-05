import { isAuthenticated } from "@/lib/authentication";
import { connect } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import ReviewModel from "@/models/Rating.model";

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

    const getReview = await ReviewModel.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    if (!getReview) {
      return response(false, 404, "Collection empty.");
    }

    return response(true, 200, "Data found.", getReview);
  } catch (error) {
    return catchError(error);
  }
}
