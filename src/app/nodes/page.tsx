
"use client";

import { useState } from "react";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import AddNodeDialog from "./_components/AddNodeDialog";

type Node = {
  id: string;
  name: string;
  url: string;
  status: "online" | "offline";
  memory: string;
  cpu: string;
  disk: string;
};

const initialNodes: Node[] = [
    {
        id: "node-1",
        name: "US-East-1",
        url: "192.168.1.10",
        status: "online",
        memory: "8GB / 16GB",
        cpu: "4 Cores @ 2.4GHz",
        disk: "100GB / 250GB"
    },
    {
        id: "node-2",
        name: "EU-West-1",
        url: "10.0.0.5",
        status: "offline",
        memory: "4GB / 8GB",
        cpu: "2 Cores @ 3.0GHz",
        disk: "50GB / 100GB"
    }
]

export default function NodesPage() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddNode = (newNodeData: Omit<Node, 'id' | 'status' | 'memory' | 'cpu' | 'disk'>) => {
    const newNode: Node = {
        ...newNodeData,
        id: `node-${Date.now()}`,
        status: "online", // Default status, could be checked in reality
        memory: "0GB / 0GB",
        cpu: "N/A",
        disk: "0GB / 0GB",
    };
    setNodes(prevNodes => [...prevNodes, newNode]);
  };

  return (
    <div className="grid flex-1 items-start gap-4">
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Nodes</h1>
          <p className="text-muted-foreground">Manage your server nodes.</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" onClick={() => setIsDialogOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Node
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Node List</CardTitle>
          <CardDescription>
            An overview of all your connected nodes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Memory</TableHead>
                <TableHead>CPU</TableHead>
                <TableHead>Disk</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nodes.map((node) => (
                <TableRow key={node.id}>
                  <TableCell className="font-medium">{node.name}</TableCell>
                  <TableCell>
                    <Badge variant={node.status === "online" ? "default" : "destructive"}>
                      {node.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{node.url}</TableCell>
                  <TableCell>{node.memory}</TableCell>
                  <TableCell>{node.cpu}</TableCell>
                  <TableCell>{node.disk}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AddNodeDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onAddNode={handleAddNode} />
    </div>
  );
}
