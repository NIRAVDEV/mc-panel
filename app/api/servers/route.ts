// app/api/servers/route.ts (update)
import { getUserFromToken } from '../../../lib/auth';
import prisma from '../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json([], { status: 401 });

  const servers = await prisma.server.findMany({
    where: { ownerId: user.id },
  });

  return NextResponse.json(servers);
}

export async function POST(req: NextRequest) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: 'Server name is required' }, { status: 400 });

  const server = await prisma.server.create({
    data: {
      name,
      ownerId: user.id,
    },
  });

  return NextResponse.json(server);
}