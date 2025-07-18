// app/api/docker/stop/route.ts
import docker from '../../../../lib/docker';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { containerName } = await req.json();

  try {
    const container = docker.getContainer(containerName);
    await container.stop();

    return NextResponse.json({ status: 'stopped' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}