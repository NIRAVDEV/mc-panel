"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Trash2, PlusCircle } from "lucide-react";
import { useToast } from "../../app/hooks/use-toast";
import { Label } from "../ui/label";

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

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await fetch("/api/nodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const newNode = await res.json();
        setNodes(prev => [newNode, ...prev]);
        setOpen(false);
        setForm({ name: "", ipAddress: "", location: "" });
        toast({ title: "Node Added" });
      } else {
        toast({ title: "Error", description: "Failed to add node.", variant: "destructive" });
      }
    });
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/nodes/${id}`, { method: "DELETE" });
    setNodes(prev => prev.filter(n => n.id !== id));
    toast({ title: "Node Deleted", variant: "destructive" });
  };

  return (
    <>
      <div className="flex justify-between p-6 pt-0">
        <div/>
        <Button onClick={() => setOpen(true)}><PlusCircle className="mr-2 h-4 w-4"/>Add Node</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleAdd}>
            <DialogHeader>
              <DialogTitle>Add New Node</DialogTitle>
              <DialogDescription>
                Configure a new physical node to host servers.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  placeholder="Node Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ipAddress" className="text-right">IP Address</Label>
                <Input
                  id="ipAddress"
                  placeholder="IP Address"
                  value={form.ipAddress}
                  onChange={e => setForm({ ...form, ipAddress: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">Location</Label>
                <Input
                  id="location"
                  placeholder="Location"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>{isPending ? "Adding..." : "Add Node"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
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
