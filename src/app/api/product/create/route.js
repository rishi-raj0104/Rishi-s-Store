import { isAuthenticated } from "@/lib/authentication";
import { connect } from "@/lib/db";
import { response, catchError, generateOTP } from "@/lib/helperFunction";
import zSchema from "@/lib/zodSchema";
import ProductModel from "@/models/Product.model";
import { encode } from "entities";
export async function POST(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }

    await connect();
    const payload = await request.json();

    const formSchema = zSchema.pick({
      name: true,
      slug: true,
      category: true,
      mrp: true,
      sellingPrice: true,
      discountPercentage: true,
      description: true,
      media: true,
    });

    const validate = formSchema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields.", validate.error);
    }

    const productData = validate.data;

    const newProduct = new ProductModel({
      name: productData.name,
      slug: productData.slug,
      category: productData.category,
      mrp: productData.mrp,
      sellingPrice: productData.sellingPrice,
      discountPercentage: productData.discountPercentage,
      description: encode(productData.description),
      media: productData.media,
    });

    await newProduct.save();
    return response(true, 200, "Product added successfully.");
  } catch (error) {
    return catchError(error);
  }
}
