import { connect } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import OrderModel from "@/models/Order.model";
import ProductModel from "@/models/Product.model";
import ProductVariantModel from "@/models/ProductVariant.model";

export async function GET(request, { params }) {
  try {
    await connect();
    const getParams = await params;
    const orderid = getParams.orderid;

    if (!orderid) {
      return response(false, 404, "Order not found.");
    }
    const orderData = await OrderModel.findOne({ order_id: orderid })
      .populate("products.productId", "name slug")
      .populate({
        path: "products.variantId",
        populate: { path: "media" },
      })
      .lean();

    if (!orderData) {
      return response(false, 404, "Order not found.");
    }

    return response(true, 200, "Order found.", orderData);
  } catch (error) {
    //console.log(error);
    return catchError(error);
  }
}
