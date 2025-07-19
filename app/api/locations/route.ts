import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // adjust if needed

export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      select: {
        name: true,
        shortCode: true,
      },
    });

    return NextResponse.json(locations);
  } catch (error) {
    console.error("GET /api/locations error:", error);
    return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
  }
}