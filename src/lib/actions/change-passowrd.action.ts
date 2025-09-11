"use server";

import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function changePassword(values: Record<string, any>) {
  try {
    // Get token from cookies each time the action runs
    const token = await getToken({
      req: {
        cookies: Object.fromEntries(
          cookies()
            .getAll()
            .map((c) => [c.name, c.value])
        ),
      } as any,
      secret: process.env.NEXTAUTH_SECRET,
    });

    //Block users with no token

    if (!token) {
      throw new Error("Unauthorized: No token found");
    }

    // Make the API request to change password

    const res = await fetch(
      "https://exam.elevateegy.com/api/v1/auth/changePassword",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: token?.accessToken ?? "",
        },
        body: JSON.stringify(values),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to change password: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error changing password:", err);
    throw err;
  }
}
