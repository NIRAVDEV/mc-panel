// app/api/servers/create/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const response = await fetch(`http://<YOUR-AGENT-IP>:8080/api/servers/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AGENT_SECRET}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to create server" }, { status: 500 });
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("[API_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}