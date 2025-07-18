
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { PlusCircle, Trash2, HardDrive, Cpu, CircleDot } from "lucide-react";
import { useToast } from "../../app/hooks/use-toast";
import type { Node } from "../../lib/types";
import { NodeForm } from "./node-form";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";


interface NodeManagementProps {
    nodes: Node[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export function NodeManagement({ nodes, isLoading, error, refetch }: NodeManagementProps) {
  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleOpenForm = (node?: Node) => {
      setSelectedNode(node);
      setFormOpen(true);
  }

  const handleDelete = (nodeId: string) => {
      startTransition(async () => {
          const res = await fetch(`/api/nodes/${nodeId}`, {
              method: "DELETE"
          });
          if (res.ok) {
              toast({ title: "Node Deleted", description: "The node has been successfully removed." });
              refetch();
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
        <Button onClick={() => handleOpenForm()}>
            <PlusCircle className="mr-2 h-4 w-4"/>
            Add Node
        </Button>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-3xl">
          <NodeForm node={selectedNode} closeDialog={() => { setFormOpen(false); refetch(); }} />
        </DialogContent>
      </Dialog>

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
            {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-8" /></TableCell>
                    </TableRow>
                ))
            ) : error ? (
                <TableRow>
                    <TableCell colSpan={7}>
                        <Alert variant="destructive">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Failed to Load Nodes</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    </TableCell>
                </TableRow>
            ) : nodes.length === 0 ? (
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

