// File: /app/api/servers/route.ts (for GET /api/servers)
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const servers = await prisma.server.findMany();
    return NextResponse.json(servers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch servers.' }, { status: 500 });
  }
}
