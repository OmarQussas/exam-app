"use server";

import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function deleteMe(test: boolean) {
  // flag for testing the funciton without deleting user
  // because I don't wanna delete many users while testing
  if (test) {
    return { ok: true };
  }

  // Get token from nextAuth
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
  // Block those with no token
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const res = await fetch("https://exam.elevateegy.com/api/v1/auth/deleteMe", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: token?.accessToken ?? "",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to delete user: ${res.statusText}`);
  }

  return res.json();
}
