import { connect } from "@/lib/db";
import mongoose from "mongoose";
import { response, catchError } from "@/lib/helperFunction";

import { isAuthenticated } from "@/lib/authentication";
import ProductVariantModel from "@/models/ProductVariant.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }

    await connect();
    const payload = await request.json();

    const ids = payload.ids || [];
    const deleteType = payload.deleteType;

    if (!Array.isArray(ids) || ids.length === 0) {
      return response(false, 400, "Invalid or empty id list.");
    }

    const data = await ProductVariantModel.find({ _id: { $in: ids } }).lean();
    if (!data.length) {
      return response(false, 404, "Data not found.");
    }
    if (!["SD", "RSD"].includes(deleteType)) {
      return response(
        false,
        400,
        "Invalid delete operation. Delete type should be SD or RSD for this route."
      );
    }

    if (deleteType === "SD") {
      await ProductVariantModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: new Date().toISOString() } }
      );
    } else {
      await ProductVariantModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: null } }
      );
    }
    return response(
      true,
      200,
      deleteType === "SD" ? "Data moved into trash." : "Data restored."
    );
  } catch (error) {
    return catchError(error);
  }
}

export async function DELETE(request) {
  const session = await mongoose.startSession();
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }

    await connect();
    const payload = await request.json();

    const ids = payload.ids || [];
    const deleteType = payload.deleteType;

    if (!Array.isArray(ids) || ids.length === 0) {
      return response(false, 400, "Invalid or empty id list.");
    }

    const data = await ProductVariantModel.find({ _id: { $in: ids } })
      .session(session)
      .lean();
    if (!data.length) {
      return response(false, 404, "Data not found.");
    }

    await ProductVariantModel.deleteMany({ _id: { $in: ids } }).session(
      session
    );

    return response(true, 200, "Data deleted permanently");
  } catch (error) {
    return catchError(error);
  }
}
