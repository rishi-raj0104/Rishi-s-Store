import { connect } from "@/lib/db";
import { response, catchError, generateOTP } from "@/lib/helperFunction";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    await connect();
    const cookieStore = await cookies();
    //cookieStore.delete("access_token");
    cookieStore.set({
      name: "access_token",
      value: "",
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // expire immediately
    });
    cookieStore.delete("access_token");

    return new Response(
      JSON.stringify({ success: true, message: "Logout successful" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return catchError(error);
  }
}
