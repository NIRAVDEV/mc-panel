'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [servers, setServers] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/servers')
      .then((res) => res.json())
      .then((data) => setServers(data));
  }, []);

  const handleCreateServer = async () => {
    setLoading(true);
    const res = await fetch('/api/servers', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const newServer = await res.json();
      setServers((prev) => [...prev, newServer]);
      setName('');
    }
    setLoading(false);
  };

  const handleStartServer = async (serverId: string) => {
    await fetch('/api/docker/start', {
      method: 'POST',
      body: JSON.stringify({ serverId }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🎮 Your Servers</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="New server name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleCreateServer}
          disabled={loading}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          {loading ? 'Creating...' : 'Create Server'}
        </button>
      </div>

      {servers.length === 0 ? (
        <p>No servers yet.</p>
      ) : (
        <ul className="space-y-2">
          {servers.map((server: any) => (
            <li key={server.id} className="border p-4 rounded shadow">
              <div className="font-semibold">{server.name}</div>
              <div className="text-sm text-gray-500">ID: {server.id}</div>
              <div className="flex items-center gap-3 mt-2">
                <Link
                  className="text-blue-500 underline"
                  href={`/dashboard/server/${server.id}`}
                >
                  Manage
                </Link>
                <button
                  onClick={() => handleStartServer(server.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  ▶️ Start
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}