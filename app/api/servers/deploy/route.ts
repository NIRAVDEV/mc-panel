import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      name,
      type,
      version,
      ram,
      nodeId,
      image,
      ports,
    } = await req.json();

    const node = await prisma.node.findUnique({ where: { id: nodeId } });
    if (!node) return NextResponse.json({ error: "Node not found" }, { status: 404 });

    const agentUrl = `http://${node.fqdn}:${node.daemonPort}/start`;

    const response = await fetch(agentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${node.token}`,
      },
      body: JSON.stringify({
        name,
        image,
        ram,
        ports,
        serverId: crypto.randomUUID(), // We'll use this as the unique container/server ID
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to deploy on agent" }, { status: 500 });
    }

    const { containerId } = await response.json();

    // Save the server to DB
    const server = await prisma.server.create({
      data: {
        id: containerId,
        name,
        ram,
        type,
        version,
        status: "Starting",
        nodeId: node.id,
        currentPlayers: 0,
        maxPlayers: 0,
        ownerId: "admin-id", // Replace with actual user if auth is implemented
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.error("Error deploying server:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}