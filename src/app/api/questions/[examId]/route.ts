import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Handles GET requests for fetching exam questions
export async function GET(
  req: NextRequest,
  { params }: { params: { examId: string } }
) {
  // Verify user authentication using NextAuth token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    // If no token found, block the request
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Build the external API URL using the examId
  const url = `https://exam.elevateegy.com/api/v1/questions?exam=${params.examId}`;

  // Forward request to the external API with user's access token
  const res = await fetch(url, {
    headers: { token: token.accessToken ?? "" },
  });

  // Parse the response into JSON
  const data = await res.json();

  // Return the external API data back to the client
  return NextResponse.json(data);
}
