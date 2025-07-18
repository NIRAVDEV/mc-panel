
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useToast } from "../../app/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Switch } from "../ui/switch";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import type { Node } from "../../lib/types";

export function NodeFormWrapper({ node }: { node?: Node }) {
    const { toast } = useToast();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

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
        <Card>
            <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                    {error && (
                        <Alert variant="destructive" className="my-4">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{JSON.stringify(error)}</AlertDescription>
                        </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder="e.g., US-West-1" defaultValue={node?.name} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" placeholder="e.g., Los Angeles, CA" defaultValue={node?.location} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="os">OS</Label>
                        <Select name="os" defaultValue={node?.os || "debian"}>
                            <SelectTrigger><SelectValue placeholder="Select an OS" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="debian">Debian / Ubuntu</SelectItem>
                                <SelectItem value="nixos">NixOS</SelectItem>
                            </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                          <Label>Visibility</Label>
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
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="fqdn">FQDN (or IP Address)</Label>
                        <Input id="fqdn" name="fqdn" placeholder="e.g., node.example.com or 192.168.1.100" defaultValue={node?.fqdn} required />
                      </div>
                       <div className="space-y-2">
                        <Label htmlFor="daemonPort">Daemon Port</Label>
                        <Input id="daemonPort" name="daemonPort" type="number" placeholder="e.g., 8080" defaultValue={node?.daemonPort || 8080} required />
                      </div>
                      <div className="flex flex-col justify-center space-y-2">
                        <Label htmlFor="useSSL">Use SSL</Label>
                        <div className="pt-1">
                            <Switch id="useSSL" name="useSSL" defaultChecked={node?.useSSL ?? true} />
                        </div>
                      </div>
                       <div className="space-y-2">
                        <Label htmlFor="memory">Memory (GB)</Label>
                        <Input id="memory" name="memory" type="number" placeholder="e.g., 64" defaultValue={node?.memory} required />
                      </div>
                        <div className="space-y-2">
                        <Label htmlFor="disk">Disk (GB)</Label>
                        <Input id="disk" name="disk" type="number" placeholder="e.g., 500" defaultValue={node?.disk} required />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Port Range</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <Input id="portsStart" name="portsStart" type="number" placeholder="Start (e.g., 25565)" defaultValue={node?.ports.start} required />
                            <Input id="portsEnd" name="portsEnd" type="number" placeholder="End (e.g., 25575)" defaultValue={node?.ports.end} required />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button asChild type="button" variant="outline">
                            <Link href="/dashboard/nodes">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                            </Link>
                        </Button>
                        <Button type="submit" disabled={isPending}>{isPending ? 'Creating...' : "Create Node"}</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
