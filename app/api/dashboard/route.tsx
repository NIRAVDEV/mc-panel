import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const servers = await prisma.server.findMany();
    const serversWithStatus = servers.map(server => ({
      ...server,
      status: "Offline", // mock for now
    }));
    const users = await prisma.user.findMany();

    const totalPlayers = servers.reduce((sum, s) => sum + (s.currentPlayers || 0), 0);
    const maxPlayers = servers.reduce((sum, s) => sum + (s.maxPlayers || 0), 0);
    // const onlineServers = servers.filter(s => s.isOnline).length;
    const onlineServers = serversWithStatus.filter(s => s.status === "Online").length;

    return NextResponse.json({
      serverCount: servers.length,
      onlineServers,
      totalUsers: users.length,
      totalPlayers,
      maxPlayers,
      serverStatus: onlineServers > 0 ? "Online" : "Offline"
    });
  } catch (err) {
    console.error("Dashboard API Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}