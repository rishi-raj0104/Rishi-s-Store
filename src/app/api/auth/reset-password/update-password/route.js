import { connect } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import zSchema from "@/lib/zodSchema";
import UserModel from "@/models/User.model";
export async function PUT(request) {
  try {
    await connect();
    const payload = await request.json();
    const validateSchema = zSchema.pick({
      email: true,
      password: true,
    });

    const validatedData = validateSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(false, 401, "Invalid or missing input field.");
    }

    const { email, password } = validatedData.data;
    const getUser = await UserModel.findOne({ deletedAt: null, email }).select(
      "+password"
    );
    if (!getUser) {
      return response(false, 404, "User not found.");
    }

    getUser.password = password;

    await getUser.save();

    return response(true, 200, "Password Updated Sucessfully.");
  } catch (error) {
    return catchError(error);
  }
}
