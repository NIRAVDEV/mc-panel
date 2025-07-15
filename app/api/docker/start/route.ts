// app/api/docker/start/route.ts
import docker from '../../../../lib/docker'; // dockerode instance
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { containerName } = await req.json();
    if (!containerName) {
      return NextResponse.json({ error: 'Missing container name' }, { status: 400 });
    }

    const container = docker.getContainer(containerName);
    await container.start();

    return NextResponse.json({ status: 'started', container: containerName });
  } catch (error: any) {
    console.error('[DOCKER START ERROR]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}