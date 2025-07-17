'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StatsCard } from "../../components/dashboard/stats-card";
import { ResourceCharts } from "../../components/dashboard/resource-charts";
import { ActivityFeed } from "../../components/dashboard/activity-feed";
import { HardDrive, Cpu, Users, ArrowRight, PlusCircle, Server } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../../components/ui/card";
import Link from "next/link";
import { Button } from "../../components/ui/button";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch("/api/dashboard");
      const json = await res.json();
      setData(json);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading || !data) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Server Status"
          value={data.serverStatus}
          icon={<HardDrive className="h-5 w-5 text-muted-foreground" />}
          change={`${data.onlineServers} of ${data.serverCount} servers online`}
          changeColor={data.serverStatus === "Online" ? "text-green-500" : ""}
        />
        <StatsCard
          title="Active Players"
          value={`${data.totalPlayers} / ${data.maxPlayers}`}
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
          change="Across all servers"
        />
        <StatsCard
          title="Total Servers"
          value={data.serverCount.toString()}
          icon={<Server className="h-5 w-5 text-muted-foreground" />}
          change="Configured servers"
        />
        <StatsCard
          title="Total Users"
          value={data.totalUsers.toString()}
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
          change="Registered accounts"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <ResourceCharts />
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get to where you need to go, faster.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/dashboard/panel">
                  Go to Control Panel <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/dashboard/panel">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create New Server
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}