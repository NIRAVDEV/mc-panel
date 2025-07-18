


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
  daemonSftpPort: z.coerce.number().int().positive(),
  useSSL: z.preprocess((val) => val === 'on' || val === 'true' || val === true, z.boolean()),
  behindProxy: z.preprocess((val) => val === 'on' || val === 'true' || val === true, z.boolean()),
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
      include: { location: true },
  });
  // In a real app, you would also check the actual status of the daemon
  const nodesWithStatus = nodes.map(n => ({...n, status: "Online" as "Online" | "Offline", servers: 0, location: n.location?.name ?? 'N/A' }))
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

    const { name, location: locationName, fqdn, daemonPort, daemonSftpPort, useSSL, behindProxy, memory, disk, portsStart, portsEnd, os, visibility } = validation.data;

    // Find or create the location
    let location = await prisma.location.findFirst({
        where: { name: { equals: locationName, mode: 'insensitive' } }
    });

    if (!location) {
        // A simple way to generate a short code. Consider a more robust method for production.
        const shortCode = locationName.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10);
        location = await prisma.location.create({
            data: { name: locationName, shortCode }
        });
    }

    const node = await prisma.node.create({
      data: {
        name,
        locationId: location.id,
        fqdn,
        daemonPort,
        daemonSftpPort,
        useSSL,
        behindProxy,
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
