import { connect } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import ProductModel from "@/models/Product.model";
import MediaModel from "@/models/Media.model";
export async function GET() {
  try {
    await connect();

    const count = await ProductModel.countDocuments({ deletedAt: null });
    const random = Math.floor(Math.random() * Math.max(0, count - 8));

    const getProduct = await ProductModel.find({ deletedAt: null })
      .skip(random)
      .limit(8)
      .populate("media", "_id secure_url")
      .lean();

    if (!getProduct) {
      return response(false, 404, "Product not found.");
    }

    return response(true, 200, "Product found.", getProduct);
  } catch (error) {
    //console.log(error);
    return catchError(error);
  }
}
