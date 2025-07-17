"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
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
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [form, setForm] = useState({ name: "", ipAddress: "", location: "" });

  useEffect(() => {
    fetch("/api/nodes")
      .then(res => res.json())
      .then(setNodes);
  }, []);

  const handleAdd = async () => {
    const res = await fetch("/api/nodes", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const newNode = await res.json();
    setNodes(prev => [newNode, ...prev]);
    setOpen(false);
    setForm({ name: "", ipAddress: "", location: "" });
    toast({ title: "Node Added" });
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/nodes/${id}`, { method: "DELETE" });
    setNodes(prev => prev.filter(n => n.id !== id));
    toast({ title: "Node Deleted", variant: "destructive" });
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Nodes</h2>
        <Button onClick={() => setOpen(true)}><PlusCircle className="mr-2 h-4 w-4"/>Add Node</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <h3 className="text-lg font-medium mb-2">Add Node</h3>
          <Input
            placeholder="Node Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="mb-2"
          />
          <Input
            placeholder="IP Address"
            value={form.ipAddress}
            onChange={e => setForm({ ...form, ipAddress: e.target.value })}
            className="mb-2"
          />
          <Input
            placeholder="Location"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            className="mb-2"
          />
          <Button onClick={handleAdd}>Add Node</Button>
        </DialogContent>
      </Dialog>

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
          {nodes.map(node => (
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
    </>
  );
}