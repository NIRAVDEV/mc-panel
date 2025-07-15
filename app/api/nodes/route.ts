import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  const nodes = await prisma.node.findMany();
  return NextResponse.json(nodes);
}

export async function POST(req: Request) {
  const { name, ip, token } = await req.json();
  const node = await prisma.node.create({
    data: { name, ip, token },
  });
  return NextResponse.json(node);
}