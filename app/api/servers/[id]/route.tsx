// app/api/servers/[id]/route.ts
import prisma from '../../../../lib/prisma';
import { getUserFromToken } from '../../../../lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const server = await prisma.server.findUnique({
    where: { id: params.id, ownerId: user.id },
  });

  if (!server) return NextResponse.json({ error: 'Server not found' }, { status: 404 });

  const subusers = await prisma.subuser.findMany({
    where: { serverId: server.id },
    include: { user: true },
  });

  return NextResponse.json({ server, subusers });
}