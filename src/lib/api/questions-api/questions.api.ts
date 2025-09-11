import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import type { Question, QuestionsResponse } from "@/lib/types/questions";

const baseAPI = process.env.BASE_API || "https://exam.elevateegy.com";

export async function getQuestions(examId: string): Promise<Question[]> {
  const url = new URL(`${baseAPI}/api/v1/questions`);
  url.searchParams.set("exam", examId);

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

  // Block users without token
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }
  // Make the api request
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token.accessToken ?? "",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch questions: ${res.status}`);
  }

  const payload: QuestionsResponse = await res.json();
  return payload.questions;
}
