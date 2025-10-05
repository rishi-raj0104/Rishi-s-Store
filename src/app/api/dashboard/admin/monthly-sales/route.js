import { isAuthenticated } from "@/lib/authentication";
import { connect } from "@/lib/db";

import { catchError, response } from "@/lib/helperFunction";
import OrderModel from "@/models/Order.model";

export async function GET() {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }
    await connect();
    const monthlySales = await OrderModel.aggregate([
      {
        $match: {
          deletedAt: null,
          status: { $in: ["processing", "shipped", "delivered"] },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalSales: { $sum: "$totalAmount" },
          orderCount: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);
    return response(true, 200, "Data found", monthlySales);
  } catch (error) {
    return catchError(error);
  }
}
