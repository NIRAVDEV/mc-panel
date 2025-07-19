import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // Adjust path as needed

export async function POST(req: Request) {
  try {
    const {
      name,
      fqdn,
      location, // e.g. "INDIA"
      visibility,
      description,
      useSSL,
      behindProxy,
      memory,
      disk,
      daemonPort,
      daemonSftpPort,
      ports,
    } = await req.json();

    const shortCode = location.toLowerCase().replace(/\s+/g, "-");

    const node = await prisma.node.create({
      data: {
        name,
        fqdn,
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
        location: {
          connectOrCreate: {
            where: { shortCode },
            create: {
              name: location,
              shortCode,
            },
          },
        },
      },
    });

    return NextResponse.json(node, { status: 201 });

  } catch (error) {
    console.error("POST /api/nodes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const nodes = await prisma.node.findMany({
      include: {
        location: true,
      },
    });

    return NextResponse.json({ nodes });
  } catch (error) {
    console.error("GET /api/nodes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}