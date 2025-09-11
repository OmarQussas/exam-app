import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import type { Exam } from "@/lib/types/exams";

const baseAPI = process.env.BASE_API || "https://exam.elevateegy.com";

export async function getExams(subjectId: string) {
  const url = new URL(`${baseAPI}/api/v1/exams`);
  url.searchParams.set("subject", subjectId);

  // 🔑 Get token from NextAuth
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

  // 🛠 Fetch exams
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token.accessToken ?? "",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch exams");
  }

  const payload: { exams: Exam[] } = await res.json();
  return payload.exams;
}
