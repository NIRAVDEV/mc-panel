'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold">MC Panel</Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden focus:outline-none"
        >
          ☰
        </button>
        <div className={`flex-col lg:flex lg:flex-row lg:items-center ${menuOpen ? 'flex' : 'hidden'} gap-4`}>
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/dashboard/nodes" className="hover:underline">Nodes</Link>
          <Link href="/dashboard/servers" className="hover:underline">Servers</Link>
          <Link href="/dashboard/logout" className="hover:underline text-red-400">Logout</Link>
        </div>
      </div>
    </nav>
  );
}