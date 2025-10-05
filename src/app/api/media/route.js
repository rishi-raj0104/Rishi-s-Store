import { catchError, response } from "@/lib/helperFunction";
import { connect } from "@/lib/db";
import MediaModel from "@/models/Media.model";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/authentication";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }
    await connect();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page"), 10) || 0;
    const limit = parseInt(searchParams.get("limit"), 10) || 0;
    const deleteType = searchParams.get("deleteType") || "SD";

    // SD=> soft delete , RSD=> restore soft delete, PD => permanent delete
    let filter = {};
    if (deleteType === "SD") {
      filter = { deletedAt: null };
    } else if (deleteType === "PD") {
      filter = { deletedAt: { $ne: null } };
    }

    const mediaData = await MediaModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit)
      .lean();

    const totalMedia = await MediaModel.countDocuments(filter);

    return NextResponse.json({
      mediaData: mediaData,
      hasMore: (page + 1) * limit < totalMedia,
    });
  } catch (error) {
    return catchError(error);
  }
}
