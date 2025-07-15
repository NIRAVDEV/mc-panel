// Instead of local /api/docker/create, send:
await fetch('http://your-vps-ip:3000/create', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: "mc_server_123", port: 25566 })
});