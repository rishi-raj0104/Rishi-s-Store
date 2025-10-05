import { connect } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import ProductVariantModel from "@/models/ProductVariant.model";
import ProductModel from "@/models/Product.model";
import MediaModel from "@/models/Media.model";
export async function POST(request) {
  try {
    await connect();
    const payload = await request.json();

    const verifiedCartData = await Promise.all(
      payload.map(async (cartItem) => {
        const variant = await ProductVariantModel.findById(cartItem.variantId)
          .populate("product")
          .populate("media", "secure_url")
          .lean();
        if (variant) {
          return {
            productId: variant.product._id,
            variantId: variant._id,
            name: variant.product.name,
            url: variant.product.slug,
            size: variant.size,
            color: variant.color,
            mrp: variant.mrp,
            sellingPrice: variant.sellingPrice,
            media: variant?.media[0]?.secure_url,
            qty: cartItem.qty,
          };
        }
      })
    );
    return response(true, 200, "Verified Cart Data.", verifiedCartData);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
