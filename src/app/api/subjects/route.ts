import { NextResponse } from "next/server";
import { getSubjects } from "@/lib/api/subjects-api/subjects.api";

// Handles GET requests for fetching paginated subjects
export async function GET(req: Request) {
  // Extract query parameters (page & limit) from the request URL
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "10");

  try {
    // Fetch subjects from the API layer with pagination
    const payload = await getSubjects({ page, limit });

    // Return the data as JSON response
    return NextResponse.json(payload);
  } catch (err: any) {
    // Log the error and return a 500 response
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
