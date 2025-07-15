import { cookies } from 'next/headers';
import { getUserFromToken } from '@/lib/auth';

export async function GET() {
  const token = cookies().get('token')?.value;
  const user = token ? getUserFromToken(token) : null;

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  return new Response(JSON.stringify({ user }), { status: 200 });
}