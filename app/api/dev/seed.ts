import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  const password = bcrypt.hashSync('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@mc.com' },
    update: {},
    create: {
      email: 'admin@mc.com',
      password,
    },
  });

  return NextResponse.json({ success: true });
}