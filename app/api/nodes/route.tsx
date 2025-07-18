
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const nodeSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  fqdn: z.string().min(1, { message: "FQDN is required" }),
  os: z.enum(["debian", "nixos"]),
  visibility: z.enum(["Public", "Private"]),
  daemonPort: z.coerce.number().int().positive(),
  useSSL: z.preprocess((val) => val === 'on' || val === true, z.boolean()),
  memory: z.coerce.number().int().positive(),
  disk: z.coerce.number().int().positive(),
  portsStart: z.coerce.number().int().positive(),
  portsEnd: z.coerce.number().int().positive(),
}).refine(data => data.portsEnd > data.portsStart, {
    message: "Port range end must be greater than start",
    path: ["portsEnd"],
});


// GET /api/nodes - Fetch all nodes
export async function GET() {
  const nodes = await prisma.node.findMany({ 
      orderBy: { createdAt: "desc" },
      // Include server count in the future
  });
  // In a real app, you would also check the actual status of the daemon
  const nodesWithStatus = nodes.map(n => ({...n, status: "Online" as "Online" | "Offline", servers: 0}))
  return NextResponse.json(nodesWithStatus);
}

// POST /api/nodes - Add a new node
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = nodeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { name, location, fqdn, daemonPort, useSSL, memory, disk, portsStart, portsEnd, os, visibility } = validation.data;

    const node = await prisma.node.create({
      data: {
        name,
        location,
        fqdn,
        daemonPort,
        useSSL,
        memory,
        disk,
        ports: { start: portsStart, end: portsEnd }, // Stored as JSON
        os,
        visibility,
        uuid: crypto.randomUUID(),
        token: crypto.randomUUID(), // Example token
        tokenId: crypto.randomUUID().substring(0, 8), // Example token id
      },
    });

    return NextResponse.json(node);
  } catch(e) {
      console.error(e);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
