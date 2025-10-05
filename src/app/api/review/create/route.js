import { isAuthenticated } from "@/lib/authentication";
import { connect } from "@/lib/db";
import { response, catchError, generateOTP } from "@/lib/helperFunction";
import zSchema from "@/lib/zodSchema";
import CategoryModel from "@/models/Category.model";
import ReviewModel from "@/models/Rating.model";
export async function POST(request) {
  try {
    const auth = await isAuthenticated("user");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }

    await connect();
    const payload = await request.json();
    const formSchema = zSchema.pick({
      product: true,
      userId: true,
      rating: true,
      title: true,
      review: true,
    });

    const validate = formSchema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields.", validate.error);
    }

    const { product, userId, rating, title, review } = validate.data;

    const newReview = new ReviewModel({
      product: product,
      user: userId,
      rating: rating,
      title: title,
      review: review,
    });

    await newReview.save();

    return response(true, 200, "Your review submitted successfully.");
  } catch (error) {
    return catchError(error);
  }
}
