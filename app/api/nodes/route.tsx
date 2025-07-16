// /app/api/nodes/route.ts
import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import prisma from '../../../lib/prisma';

const SECRET = process.env.NODE_AGENT_SECRET || 'changeme';

export async function POST(req: Request) {
  const { name, location } = await req.json();

  // Save node info to DB
  const node = await prisma.node.Create({
    data: {
      name,
      location,
    },
  });

  // Create signed token
  const token = sign({ nodeId: node.id }, SECRET, { expiresIn: '7d' });

  return NextResponse.json({ token });
}
