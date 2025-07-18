
'use client';

import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { NodeManagement } from "../../../components/nodes/node-management";
import type { Node } from "../../../lib/types";
import { Skeleton } from "../../../components/ui/skeleton";

export default function NodesPage() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNodes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/nodes");
      if (!res.ok) throw new Error("Failed to fetch nodes");
      const data = await res.json();
      setNodes(data || []); 
    } catch (err: any) {
      console.error("Error loading nodes:", err);
      setError(err.message);
      setNodes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNodes();
  }, []);

  return (
    <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold font-headline lg:text-3xl">Node Management</h1>
            <p className="text-muted-foreground">Manage the physical nodes that your servers run on.</p>
        </div>
      <Card>
        <CardContent className="p-6">
            <NodeManagement 
                nodes={nodes}
                isLoading={loading}
                error={error}
                refetch={fetchNodes}
            />
        </CardContent>
      </Card>
    </div>
  );
}
