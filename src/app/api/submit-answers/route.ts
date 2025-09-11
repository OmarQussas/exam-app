import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Handles POST requests for checking exam questions
export async function POST(req: NextRequest) {
  // Authenticate user using NextAuth JWT
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    // Block request if no valid token is found
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse request body (answers or submitted data)
  const body = await req.json();

  // Forward request to the external API for validation
  const res = await fetch(
    "https://exam.elevateegy.com/api/v1/questions/check",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token.accessToken ?? "",
      },
      body: JSON.stringify(body),
    }
  );

  // Return the external API response back to the client
  const data = await res.json();
  return NextResponse.json(data);
}
