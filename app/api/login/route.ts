import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return new Response('User not found', { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return new Response('Invalid password', { status: 401 });

  const token = sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

  (await cookies()).set('token', token, { httpOnly: true, path: '/' });

  return Response.json({ success: true });
}