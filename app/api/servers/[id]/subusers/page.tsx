// app/api/servers/[id]/subusers/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import { getUserFromToken } from '../../../../../lib/auth';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const server = await prisma.server.findFirst({
    where: { id: params.id, ownerId: user.id },
  });

  if (!server) return NextResponse.json({ error: 'Server not found or not owned by you' }, { status: 404 });

  const { email, canStart, canStop, canConsole } = await req.json();
  const subuser = await prisma.user.findUnique({ where: { email } });

  if (!subuser) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const existing = await prisma.subuser.findFirst({
    where: { userId: subuser.id, serverId: server.id },
  });

  if (existing) {
    return NextResponse.json({ error: 'Subuser already added' }, { status: 400 });
  }

  const result = await prisma.subuser.create({
    data: {
      serverId: server.id,
      userId: subuser.id,
      canStart,
      canStop,
      canConsole,
    },
  });

  return NextResponse.json(result);
}