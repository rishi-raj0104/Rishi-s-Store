import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getLoggedInUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (!token) return null;

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);

    return payload;
  } catch (error) {
    return null;
  }
}
