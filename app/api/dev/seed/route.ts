// app/api/dev/seed/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  const email = 'admin@mc.com';
  const plainPassword = 'admin123';
  const hashedPassword = bcrypt.hashSync(plainPassword, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: '✅ Admin user created or already exists.' });
}