'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ServerPage() {
  const { id } = useParams();
  const [server, setServer] = useState<any>(null);
  const [subusers, setSubusers] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [permissions, setPermissions] = useState({
    canStart: false,
    canStop: false,
    canConsole: false,
  });

  useEffect(() => {
    fetch(`/api/servers/${id}`)
      .then(res => res.json())
      .then(data => {
        setServer(data.server);
        setSubusers(data.subusers);
      });
  }, [id]);

  const addSubuser = async () => {
    const res = await fetch(`/api/servers/${id}/subusers`, {
      method: 'POST',
      body: JSON.stringify({ email, ...permissions }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const newSub = await res.json();
      setSubusers(prev => [...prev, newSub]);
      setEmail('');
      setPermissions({ canStart: false, canStop: false, canConsole: false });
    }
  };

  if (!server) return <p>Loading...</p>;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">⚙️ Manage Server: {server.name}</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Add Subuser</h2>
        <div className="flex flex-col gap-2">
          <input
            placeholder="User email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border p-2 rounded"
          />
          <label>
            <input
              type="checkbox"
              checked={permissions.canStart}
              onChange={e => setPermissions(p => ({ ...p, canStart: e.target.checked }))}
            />
            {' '}Can Start
          </label>
          <label>
            <input
              type="checkbox"
              checked={permissions.canStop}
              onChange={e => setPermissions(p => ({ ...p, canStop: e.target.checked }))}
            />
            {' '}Can Stop
          </label>
          <label>
            <input
              type="checkbox"
              checked={permissions.canConsole}
              onChange={e => setPermissions(p => ({ ...p, canConsole: e.target.checked }))}
            />
            {' '}Can Use Console
          </label>
          <button
            onClick={addSubuser}
            className="bg-blue-600 text-white px-4 py-2 rounded w-fit"
          >
            ➕ Add Subuser
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">👥 Subusers</h2>
        {subusers.length === 0 ? (
          <p>No subusers added.</p>
        ) : (
          <ul className="space-y-2">
            {subusers.map((sub) => (
              <li key={sub.id} className="border p-3 rounded shadow">
                <div><strong>{sub.user.email}</strong></div>
                <div className="text-sm text-gray-600">
                  Permissions: {[
                    sub.canStart && 'Start',
                    sub.canStop && 'Stop',
                    sub.canConsole && 'Console',
                  ].filter(Boolean).join(', ') || 'None'}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Link href={`/dashboard/server/${server.id}/console`} className="text-blue-500 underline block mt-4">🔌 Open Console</Link>
      <button
        className="bg-yellow-600 text-white px-3 py-1 rounded"
        onClick={() =>
          fetch('/api/docker/stop', {
            method: 'POST',
            body: JSON.stringify({ containerName: `mc_server_${server.id}` }),
            headers: { 'Content-Type': 'application/json' },
          })
        }
      >
        🛑 Stop
      </button>

      <button
        className="bg-red-600 text-white px-3 py-1 rounded ml-2"
        onClick={() =>
          fetch('/api/docker/delete', {
            method: 'POST',
            body: JSON.stringify({
              containerName: `mc_server_${server.id}`,
              serverId: server.id,
            }),
            headers: { 'Content-Type': 'application/json' },
          })
        }
      >
        🗑️ Delete
      </button>
    </main>
  );
}