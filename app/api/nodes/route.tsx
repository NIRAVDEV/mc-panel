import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

// GET /api/nodes - Fetch all nodes
export async function GET() {
  const nodes = await prisma.node.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(nodes);
}

// POST /api/nodes - Add a new node
export async function POST(req: Request) {
  const body = await req.json();
  const { name, ipAddress, location } = body;

  const node = await prisma.node.create({
    data: {
      name: name,
      ipAddress: ipAddress,  // ✅ Matches the schema now
      location: location`, // ✅ Matches the schema now`,
      port: 8080, // 👈 Add a default port if you're not passing it in the body
      token: crypto.randomUUID(), // 👈 Optional: generate a secure token
    },
  });

  return NextResponse.json(node);
}