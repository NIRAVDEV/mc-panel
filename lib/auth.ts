// lib/auth.ts
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function getUserFromToken(req: any) {
  const token = cookies().get('token')?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload;
  } catch {
    return null;
  }
}