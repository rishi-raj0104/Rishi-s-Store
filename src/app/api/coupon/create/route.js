import { isAuthenticated } from "@/lib/authentication";
import { connect } from "@/lib/db";
import { response, catchError, generateOTP } from "@/lib/helperFunction";
import zSchema from "@/lib/zodSchema";
import CouponModel from "@/models/Coupon.model";
export async function POST(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }

    await connect();
    const payload = await request.json();

    const formSchema = zSchema.pick({
      code: true,
      discountPercentage: true,
      minShoppingAmount: true,
      validity: true,
    });
    const validate = formSchema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields.", validate.error);
    }

    const couponData = validate.data;

    const newCoupon = new CouponModel({
      code: couponData.code,
      discountPercentage: couponData.discountPercentage,
      minShoppingAmount: couponData.minShoppingAmount,
      validity: couponData.validity,
    });

    await newCoupon.save();
    return response(true, 200, "Coupon added successfully.");
  } catch (error) {
    return catchError(error);
  }
}
