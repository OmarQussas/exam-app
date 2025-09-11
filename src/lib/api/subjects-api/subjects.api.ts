import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import type { Subject, GetSubjectsOptions } from "../../types/subjects";

const baseAPI = process.env.BASE_API || "https://exam.elevateegy.com";

export async function getSubjects({
  page = 1,
  limit = 10,
}: GetSubjectsOptions = {}) {
  const url = new URL(`${baseAPI}/api/v1/subjects`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  //  Get the token directly from NextAuth (no need for extra route)
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

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  // Use the token with your backend API
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token.accessToken ?? "", // or token.jwt depending on your setup
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch subjects");
  }

  const payload = await res.json();
  return payload;
}
