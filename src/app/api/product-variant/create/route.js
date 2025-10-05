import { isAuthenticated } from "@/lib/authentication";
import { connect } from "@/lib/db";
import { response, catchError, generateOTP } from "@/lib/helperFunction";
import zSchema from "@/lib/zodSchema";
import ProductVariantModel from "@/models/ProductVariant.model";
export async function POST(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }

    await connect();
    const payload = await request.json();

    const formSchema = zSchema.pick({
      product: true,
      sku: true,
      color: true,
      size: true,
      mrp: true,
      sellingPrice: true,
      discountPercentage: true,
      media: true,
    });

    const validate = formSchema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields.", validate.error);
    }

    const variantData = validate.data;

    const newProductVariant = new ProductVariantModel({
      product: variantData.product,
      color: variantData.color,
      size: variantData.size,
      sku: variantData.sku,
      mrp: variantData.mrp,
      sellingPrice: variantData.sellingPrice,
      discountPercentage: variantData.discountPercentage,
      media: variantData.media,
    });

    await newProductVariant.save();
    return response(true, 200, "Product Variant added successfully.");
  } catch (error) {
    //console.log('errorrr',error);
    return catchError(error);
  }
}
