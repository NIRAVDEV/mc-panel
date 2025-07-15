// app/api/docker/delete/route.ts
import docker from '../../../../lib/docker';
import { prisma } from '../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { containerName, serverId } = await req.json();

  try {
    const container = docker.getContainer(containerName);
    await container.remove({ force: true }); // stop & delete

    // Also remove from database
    await prisma.server.delete({
      where: { id: serverId },
    });

    return NextResponse.json({ status: 'deleted' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}