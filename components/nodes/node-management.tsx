
"use client";

import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { PlusCircle, Trash2, HardDrive, Cpu, CircleDot } from "lucide-react";
import { useToast } from "../../app/hooks/use-toast";
import type { Node } from "../../lib/types";
import { Badge } from "../ui/badge";

interface NodeManagementProps {
    initialNodes: Node[];
    refetch: () => Promise<void>;
}

export function NodeManagement({ initialNodes, refetch }: NodeManagementProps) {
  const [nodes, setNodes] = useState(initialNodes);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes]);

  const handleDelete = (nodeId: string) => {
      startTransition(async () => {
          const res = await fetch(`/api/nodes/${nodeId}`, {
              method: "DELETE"
          });
          if (res.ok) {
              toast({ title: "Node Deleted", description: "The node has been successfully removed." });
              await refetch();
          } else {
              toast({ title: "Error", description: "Failed to delete the node.", variant: "destructive" });
          }
      });
  }
  
  const getStatusBadge = (status: Node['status']) => {
    switch (status) {
      case "Online":
        return <Badge className="bg-green-500 hover:bg-green-600 gap-1.5 pl-1.5"><CircleDot className="animate-pulse" />Online</Badge>;
      case "Offline":
        return <Badge variant="destructive" className="gap-1.5"><CircleDot />Offline</Badge>;
    }
  }


  return (
    <>
      <div className="flex justify-end mb-4">
        <Button asChild>
            <Link href="/dashboard/nodes/new">
                <PlusCircle className="mr-2 h-4 w-4"/>
                Add Node
            </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Memory</TableHead>
                <TableHead>Disk</TableHead>
                <TableHead>Servers</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {nodes.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                        No nodes have been created yet.
                    </TableCell>
                </TableRow>
            ) : (
                nodes.map(node => (
                <TableRow key={node.id} className={isPending ? 'opacity-50' : ''}>
                    <TableCell>{getStatusBadge(node.status)}</TableCell>
                    <TableCell>
                        <Link href={`/dashboard/nodes/${node.id}`} className="font-medium hover:underline">{node.name}</Link>
                        <div className="text-muted-foreground text-xs">{node.fqdn}</div>
                    </TableCell>
                    <TableCell>{node.location}</TableCell>
                    <TableCell className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                        <span>{node.memory} GB</span>
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                        <span>{node.disk} GB</span>
                    </TableCell>
                    <TableCell>{node.servers}</TableCell>
                    <TableCell className="text-right">
                        <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(node.id)}
                        disabled={isPending}
                        >
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </TableCell>
                </TableRow>
                ))
            )}
            </TableBody>
        </Table>
      </div>
    </>
  );
}
