
"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useToast } from "../../app/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import type { Node } from "../../lib/types";
import { Textarea } from "../ui/textarea";

type Location = {
    id: string;
    name: string;
    shortCode: string;
}

export function NodeFormWrapper({ node }: { node?: Node }) {
    const { toast } = useToast();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<any>(null);
    const [locations, setLocations] = useState<Location[]>([]);
    const [loadingLocations, setLoadingLocations] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await fetch("/api/locations");
                if (!res.ok) throw new Error("Failed to fetch locations");
                const data = await res.json();
                setLocations(data);
            } catch (err) {
                toast({
                    title: "Error",
                    description: "Could not fetch locations.",
                    variant: "destructive"
                });
            } finally {
                setLoadingLocations(false);
            }
        };
        fetchLocations();
    }, [toast]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        const formData = new FormData(event.currentTarget);
        
        startTransition(async () => {
            const body = Object.fromEntries(formData.entries());
            const res = await fetch("/api/nodes", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                toast({
                    title: node ? "Node Updated" : "Node Created",
                    description: `The node has been successfully ${node ? 'updated' : 'created'}.`,
                });
                router.push("/dashboard/nodes");
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "An unknown error occurred.");
            }
        });
    };
    
    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <Alert variant="destructive" className="my-4">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{typeof error === 'string' ? error : JSON.stringify(error)}</AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Basic Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" defaultValue={node?.name} required />
                            <p className="text-xs text-muted-foreground">Character limits: a-zA-Z0-9_.- and [Space] (min 1, max 100 characters).</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" rows={5} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="locationId">Location</Label>
                            <Select name="locationId" defaultValue={node?.location}>
                                <SelectTrigger disabled={loadingLocations}>
                                    <SelectValue placeholder="Select a location" />
                                </SelectTrigger>
                                <SelectContent>
                                    {loadingLocations ? (
                                        <SelectItem value="loading" disabled>Loading locations...</SelectItem>
                                    ) : locations.length > 0 ? (
                                        locations.map(loc => (
                                            <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="no-locations" disabled>No locations found. Add one on the Locations page.</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label>Node Visibility</Label>
                            <RadioGroup name="visibility" defaultValue={node?.visibility || 'Public'} className="flex items-center space-x-4 pt-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Public" id="v-public" />
                                    <Label htmlFor="v-public">Public</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Private" id="v-private" />
                                    <Label htmlFor="v-private">Private</Label>
                                </div>
                            </RadioGroup>
                            <p className="text-xs text-muted-foreground">By setting a node to <code className="text-xs">private</code> you will be denying the ability to auto-deploy to this node.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fqdn">FQDN</Label>
                            <Input id="fqdn" name="fqdn" placeholder="e.g., node.example.com" defaultValue={node?.fqdn} required />
                             <p className="text-xs text-muted-foreground">Please enter domain name to be used for connecting to the daemon. An IP address may be used only if you are not using SSL for this node.</p>
                        </div>

                         <div className="space-y-2">
                            <Label>Communicate Over SSL</Label>
                             <RadioGroup name="useSSL" defaultValue={'true'} className="flex items-center space-x-4 pt-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="true" id="ssl" />
                                    <Label htmlFor="ssl">Use SSL Connection</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="false" id="http" />
                                    <Label htmlFor="http">Use HTTP Connection</Label>
                                </div>
                             </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label>Behind Proxy</Label>
                            <RadioGroup name="behindProxy" defaultValue={'false'} className="flex items-center space-x-4 pt-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="false" id="not_behind" />
                                    <Label htmlFor="not_behind">Not Behind Proxy</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="true" id="behind" />
                                    <Label htmlFor="behind">Behind Proxy</Label>
                                </div>
                            </RadioGroup>
                             <p className="text-xs text-muted-foreground">If you are running the daemon behind a proxy such as Cloudflare, select this.</p>
                        </div>

                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                     <CardHeader>
                        <CardTitle>Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="daemonDir">Daemon Server File Directory</Label>
                            <Input id="daemonDir" name="daemonDir" defaultValue="/var/lib/pterodactyl/volumes" />
                            <p className="text-xs text-muted-foreground">Enter the directory where server files should be stored.</p>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="memory">Total Memory</Label>
                                <Input id="memory" name="memory" type="number" placeholder="e.g., 8192" required />
                             </div>
                              <div className="space-y-2">
                                <Label htmlFor="memory_overallocate">Memory Over-Allocation</Label>
                                <Input id="memory_overallocate" name="memory_overallocate" type="number" defaultValue="0" required />
                             </div>
                         </div>
                         <p className="text-xs text-muted-foreground -mt-2">Enter the total amount of memory available for new servers. To disable checking for overallocation enter <code className="text-xs">-1</code> into the field.</p>
                        
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="disk">Total Disk Space</Label>
                                <Input id="disk" name="disk" type="number" placeholder="e.g., 20000" required />
                             </div>
                              <div className="space-y-2">
                                <Label htmlFor="disk_overallocate">Disk Over-Allocation</Label>
                                <Input id="disk_overallocate" name="disk_overallocate" type="number" defaultValue="0" required />
                             </div>
                         </div>
                         <p className="text-xs text-muted-foreground -mt-2">Enter the total amount of disk space available for new servers. To disable checking for overallocation enter <code className="text-xs">-1</code> into the field.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="portsStart">Allocation Range Start</Label>
                                <Input id="portsStart" name="portsStart" type="number" placeholder="e.g., 25565" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="portsEnd">Allocation Range End</Label>
                                <Input id="portsEnd" name="portsEnd" type="number" placeholder="e.g., 25600" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="daemonPort">Daemon Port</Label>
                                <Input id="daemonPort" name="daemonPort" type="number" defaultValue={8080} required />
                                 <p className="text-xs text-muted-foreground">The daemon runs its own SFTP management container and does not use the SSHd process.</p>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="daemonSftpPort">Daemon SFTP Port</Label>
                                <Input id="daemonSftpPort" name="daemonSftpPort" type="number" defaultValue={2022} required />
                                 <p className="text-xs text-muted-foreground">Do not use the same port that you have assigned for your physical server's SSH process.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
                <Button asChild type="button" variant="outline">
                    <Link href="/dashboard/nodes">
                        Cancel
                    </Link>
                </Button>
                <Button type="submit" disabled={isPending} className="bg-green-600 hover:bg-green-700">{isPending ? 'Creating...' : "Create Node"}</Button>
            </div>
        </form>
    );
}
