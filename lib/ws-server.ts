// lib/ws-server.ts
import { WebSocketServer } from 'ws';
import docker from './docker';

const wss = new WebSocketServer({ port: 3001 }); // Use 3001 locally

wss.on('connection', async (ws, req) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  const containerId = url.searchParams.get('id');

  if (!containerId) {
    ws.close();
    return;
  }

  try {
    const container = docker.getContainer(containerId);
    const logStream = await container.logs({
      follow: true,
      stdout: true,
      stderr: true,
      since: 0,
    });

    logStream.on('data', (chunk) => {
      ws.send(chunk.toString('utf-8'));
    });

    ws.on('message', async (message) => {
      // Interpret as a command to execute
      const exec = await container.exec({
        Cmd: ['/bin/sh', '-c', message.toString()],
        AttachStdout: true,
        AttachStderr: true,
      });

      exec.start((err, stream) => {
        if (stream) {
          stream.on('data', (data) => ws.send(data.toString()));
        }
      });
    });

    ws.on('close', () => {
      logStream.destroy();
    });
  } catch (e) {
    ws.send(`[error] ${e.message}`);
    ws.close();
  }
});