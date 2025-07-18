
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const locationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  shortCode: z.string().min(1, { message: "Short code is required" }),
});

// GET /api/locations - Fetch all locations
export async function GET() {
  const locations = await prisma.location.findMany({ 
      orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(locations);
}

// POST /api/locations - Add a new location
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = locationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { name, shortCode } = validation.data;

    // Check if shortCode already exists
    const existing = await prisma.location.findUnique({ where: { shortCode } });
    if (existing) {
        return NextResponse.json({ error: "A location with this short code already exists." }, { status: 409 });
    }

    const location = await prisma.location.create({
      data: { name, shortCode },
    });

    return NextResponse.json(location, { status: 201 });
  } catch(e) {
      console.error(e);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
