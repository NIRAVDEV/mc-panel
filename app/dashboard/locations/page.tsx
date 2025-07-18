
'use client';

import { useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "../../../app/hooks/use-toast";
import { Skeleton } from "../../../components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";
import { Terminal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

type Location = {
  id: string;
  name: string;
  shortCode: string;
};

function AddLocationDialog({ refetch }: { refetch: () => void }) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name') as string;
        const shortCode = formData.get('shortCode') as string;

        startTransition(async () => {
            const res = await fetch("/api/locations", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, shortCode }),
            });

            if (res.ok) {
                toast({ title: "Location Added", description: `Location "${name}" has been created.` });
                setOpen(false);
                refetch();
            } else {
                const data = await res.json();
                toast({ title: "Error", description: data.error || "Failed to add location.", variant: "destructive" });
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Add Location
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Location</DialogTitle>
                        <DialogDescription>
                            Create a new location to assign nodes to.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Location Name</Label>
                            <Input id="name" name="name" placeholder="e.g., Frankfurt" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="shortCode">Short Code</Label>
                            <Input id="shortCode" name="shortCode" placeholder="e.g., DE" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                        <Button type="submit" disabled={isPending}>{isPending ? "Adding..." : "Add Location"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, startTransition] = useTransition();
  const { toast } = useToast();

  const fetchLocations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/locations");
      if (!res.ok) throw new Error("Failed to fetch locations");
      const data = await res.json();
      setLocations(data || []);
    } catch (err: any) {
      console.error("Error loading locations:", err);
      setError(err.message);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleDelete = (locationId: string) => {
    startTransition(async () => {
        const res = await fetch(`/api/locations/${locationId}`, { method: 'DELETE' });
        if (res.ok) {
            toast({ title: "Location Deleted", description: "The location was successfully removed." });
            fetchLocations();
        } else {
            const data = await res.json();
            toast({ title: "Error", description: data.error || "Failed to delete location.", variant: "destructive" });
        }
    });
  }

  return (
    <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold font-headline lg:text-3xl">Location Management</h1>
            <p className="text-muted-foreground">Manage the locations that your nodes can be assigned to.</p>
        </div>
      <Card>
        <CardContent className="p-6">
            <div className="flex justify-end mb-4">
                <AddLocationDialog refetch={fetchLocations} />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Short Code</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                             Array.from({ length: 2 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-8 w-8" /></TableCell>
                                </TableRow>
                            ))
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Alert variant="destructive">
                                        <Terminal className="h-4 w-4" />
                                        <AlertTitle>Failed to Load Locations</AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                </TableCell>
                            </TableRow>
                        ) : locations.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center">
                                    No locations have been created yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            locations.map(location => (
                                <TableRow key={location.id} className={isDeleting ? 'opacity-50' : ''}>
                                    <TableCell>{location.name}</TableCell>
                                    <TableCell>{location.shortCode}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(location.id)}
                                            disabled={isDeleting}
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
        </CardContent>
      </Card>
    </div>
  );
}
