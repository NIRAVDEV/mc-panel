'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch('/api/me').then(async res => {
      setAuthenticated(res.ok);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  return authenticated ? (
    <h1 className="text-xl font-bold">Welcome to your dashboard</h1>
  ) : (
    <p>You are not logged in.</p>
  );
}