const AGENT_URL = 'http://YOUR_AGENT_IP:3000';
const JWT = 'your-jwt-here'; // Or import from session/context

export const agentFetch = async (path: string, body: any) => {
  const res = await fetch(`${AGENT_URL}/${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${JWT}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return res.json();
};