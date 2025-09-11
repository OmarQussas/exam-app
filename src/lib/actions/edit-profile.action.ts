// /lib/actions/editProfile.action.ts
"use server";

import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function editProfile(values: Record<string, any>) {
  try {
    // get token each time the action runs
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

    // block users with no token
    if (!token) {
      throw new Error("Unauthorized: No token found");
    }

    // make the api request
    const res = await fetch(
      "https://exam.elevateegy.com/api/v1/auth/editProfile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token?.accessToken ?? "",
        },
        body: JSON.stringify(values),
      }
    );

    // handle errors

    if (!res.ok) {
      throw new Error(`Failed to update profile: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error editing profile:", err);
    throw err;
  }
}
