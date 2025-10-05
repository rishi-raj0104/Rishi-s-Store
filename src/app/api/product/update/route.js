import { isAuthenticated } from "@/lib/authentication";
import { connect } from "@/lib/db";
import { response, catchError, generateOTP } from "@/lib/helperFunction";
import zSchema from "@/lib/zodSchema";
import ProductModel from "@/models/Product.model";
import { encode } from "entities";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }

    await connect();
    const payload = await request.json();
    const formSchema = zSchema.pick({
      _id: true,
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

    const validatedData = validate.data;

    const getProduct = await ProductModel.findOne({
      deletedAt: null,
      _id: validatedData._id,
    });
    if (!getProduct) {
      return response(false, 404, "Data not found.");
    }

    getProduct.name = validatedData.name;
    getProduct.slug = validatedData.slug;
    getProduct.category = validatedData.category;
    getProduct.mrp = validatedData.mrp;
    getProduct.sellingPrice = validatedData.sellingPrice;
    getProduct.discountPercentage = validatedData.discountPercentage;
    getProduct.description = encode(validatedData.description);
    getProduct.media = validatedData.media;
    await getProduct.save();

    return response(true, 200, "Product updated successfully.");
  } catch (error) {
    return catchError(error);
  }
}
