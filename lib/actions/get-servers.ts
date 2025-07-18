import prisma from "../prisma";
import type { Server } from "@prisma/client";

// Utility mock function to simulate Docker status (replace later with real check)
function checkServerStatusMock(server: Server): "Online" | "Offline" {
  // Example logic: mock every second server as "Online"
  return server.id.charCodeAt(0) % 2 === 0 ? "Online" : "Offline";
}

export async function getServersWithStatus(): Promise<
  (Server & {
    status: "Online" | "Offline" | "Starting";
    currentPlayers?: number;
    maxPlayers?: number;
    ram?: number;
    type?: string;
    version?: string;
  })[]
> {
  const servers = await prisma.server.findMany();

  return servers.map((server) => ({
    ...server,
    status: checkServerStatusMock(server), // Replace this later with real Docker check
    currentPlayers: 0,
    maxPlayers: 20,
    ram: 2,
    type: "Paper",
    version: "1.20.4",
  }));
}