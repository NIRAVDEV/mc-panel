'use client';
import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { NodeManagement } from "../../../components/nodes/node-management";
import { Node } from "../../../lib/types";



export default function NodesPage() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const res = await fetch("/api/nodes", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch nodes");
        const data = await res.json();
        setNodes(data.nodes || []); // ✅ CORRECT
      } catch (err) {
        console.error("Error loading nodes:", err);
        setNodes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNodes();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Node Management</CardTitle>
          <CardDescription>
            Manage the physical nodes that your servers run on.
          </CardDescription>
        </CardHeader>

        {loading ? (
          <div className="p-4">Loading nodes...</div>
        ) : (
          <NodeManagement
            initialNodes={nodes}
            refetch={async () => {
              // You can later implement a real refetch here
              console.log("Refetch called!");
            }}
          />
        )}
      </Card>
    </div>
  );
}