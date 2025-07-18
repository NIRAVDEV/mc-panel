
"use client";

import { useEffect, useState, useTransition } from "react";
import Link from 'next/link';
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Trash2, PlusCircle } from "lucide-react";
import { useToast } from "../../app/hooks/use-toast";

type Node = {
  id: string;
  name: string;
  ipAddress: string;
  location?: string;
};

export function NodeManagement() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetch("/api/nodes")
      .then(res => res.json())
      .then(setNodes);
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/nodes/${id}`, { method: "DELETE" });
    setNodes(prev => prev.filter(n => n.id !== id));
    toast({ title: "Node Deleted", variant: "destructive" });
  };

  return (
    <>
      <div className="flex justify-between p-6 pt-0">
        <div/>
        <Button asChild>
            <Link href="/dashboard/nodes/new">
                <PlusCircle className="mr-2 h-4 w-4"/>Add Node
            </Link>
        </Button>
      </div>

      <div className="border-t">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nodes && nodes.map(node => (
              <TableRow key={node.id}>
                <TableCell>{node.name}</TableCell>
                <TableCell>{node.ipAddress}</TableCell>
                <TableCell>{node.location || "-"}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(node.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
