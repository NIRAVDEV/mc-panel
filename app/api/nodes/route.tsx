import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

// GET /api/nodes - Fetch all nodes
export async function GET() {
  const nodes = await prisma.node.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(nodes);
}

// POST /api/nodes - Add a new node
export async function POST(req: Request) {
  const body = await req.json();
  const {
    name,
    fqdn,
    location,
    visibility,
    description,
    useSSL,
    behindProxy,
    memory,
    disk,
    daemonPort,
    daemonSftpPort,
    ports,
  } = body;

  const node = await prisma.node.create({
    data: {
      name,
      fqdn,
      location,
      visibility,
      description,
      useSSL,
      behindProxy,
      memory,
      disk,
      daemonPort,
      daemonSftpPort,
      ports,
      token: crypto.randomUUID(),
    },
  });

  return NextResponse.json(node);
}