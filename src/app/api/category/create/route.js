import { isAuthenticated } from "@/lib/authentication";
import { connect } from "@/lib/db";
import {
  response,
  catchError,
  generateOTP,
} from "@/lib/helperFunction";
import zSchema from "@/lib/zodSchema";
import CategoryModel from "@/models/Category.model";
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
    });

    const validate = formSchema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields.", validate.error);
    }

    const { name, slug } = validate.data;

    const newCategory = new CategoryModel({
      name,
      slug,
    });

    await newCategory.save();
    return response(true, 200, "Category added successfully.");
  } catch (error) {
    return catchError(error);
  }
}
