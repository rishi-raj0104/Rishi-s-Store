import { isAuthenticated } from "@/lib/authentication";
import { connect } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import ProductVariantModel from "@/models/ProductVariant.model";

import { isValidObjectId } from "mongoose";

export async function GET(request, { params }) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }

    await connect();

    const getParams = await params;
    const id = getParams.id;

    const filter = {
      deletedAt: null,
    };

    if (!isValidObjectId(id)) {
      return response(false, 400, "Invalid object id.");
    }

    filter._id = id;

    const getProductVariant = await ProductVariantModel.findOne(filter)
      .populate("media", "_id secure_url")
      .lean();

    if (!getProductVariant) {
      return response(false, 404, "Product Variant not found.");
    }

    return response(true, 200, "Product Variant found.", getProductVariant);
  } catch (error) {
    return catchError(error);
  }
}
