// app/dashboard/server/[id]/console/page.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';

export default function ConsolePage() {
  const { id } = useParams();
  const [logs, setLogs] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const logRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3001/?id=mc_server_${id}`);
    socketRef.current = ws;

    ws.onmessage = (msg) => {
      setLogs((prev) => [...prev, msg.data]);
    };

    return () => {
      ws.close();
    };
  }, [id]);

  useEffect(() => {
    logRef.current?.scrollTo(0, logRef.current.scrollHeight);
  }, [logs]);

  const sendCommand = () => {
    if (!input) return;
    socketRef.current?.send(input);
    setLogs((prev) => [...prev, `> ${input}`]);
    setInput('');
  };

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Live Console</h1>

      <div
        ref={logRef}
        className="bg-black text-green-400 p-4 rounded h-80 overflow-y-auto font-mono shadow"
      >
        {logs.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      <div className="flex mt-4 gap-2">
        <input
          className="border p-2 w-full rounded"
          placeholder="Enter command"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendCommand()}
        />
        <button
          onClick={sendCommand}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </main>
  );
}