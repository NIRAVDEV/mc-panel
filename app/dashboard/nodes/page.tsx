'use client';
import { useEffect, useState } from 'react';

export default function NodesPage() {
  const [nodes, setNodes] = useState([]);
  const [name, setName] = useState('');
  const [ip, setIP] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    fetch('/api/nodes')
      .then(res => res.json())
      .then(data => setNodes(data));
  }, []);

  const addNode = async () => {
    await fetch('/api/nodes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, ip, token }),
    });
    setName('');
    setIP('');
    setToken('');
    window.location.reload();
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🌐 Connected Nodes</h1>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border p-2 w-full mb-2" />
      <input placeholder="IP" value={ip} onChange={e => setIP(e.target.value)} className="border p-2 w-full mb-2" />
      <input placeholder="Token" value={token} onChange={e => setToken(e.target.value)} className="border p-2 w-full mb-4" />
      <button onClick={addNode} className="bg-blue-600 text-white px-4 py-2 rounded">Add Node</button>
      <ul className="mt-6 space-y-2">
        {nodes.map((n: any) => (
          <li key={n.id} className="border p-4 rounded">
            <div className="font-bold">{n.name}</div>
            <div>{n.ip}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}