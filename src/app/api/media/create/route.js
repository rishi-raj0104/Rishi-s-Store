import { connect } from "@/lib/db";
import MediaModel from "@/models/Media.model";
import { response, catchError} from "@/lib/helperFunction";
import { isAuthenticated } from "@/lib/authentication";
export async function POST(request) {
  const payload = await request.json();
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }

    await connect();
    const newMedia = await MediaModel.insertMany(payload);
    //console.log('newMedia',newMedia);
    return response(true, 200, "Media upload successfully.", newMedia);
  } catch (error) {
    if (payload && payload.length > 0) {
      const publicIds = payload.map((data) => data.public_id);
      try {
        await cloudinary.api.delete_resources(publicIds);
      } catch (deleteError) {
        error.cloudinary = deleteError;
      }
    }
    return catchError(error);
  }
}
