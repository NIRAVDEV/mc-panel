
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../../components/ui/breadcrumb";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function NewNodePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard/nodes">Nodes</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>New Node</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold font-headline lg:text-3xl">New Node</h1>
        <p className="text-muted-foreground">Create a new local or remote node for servers to be installed to.</p>
      </div>
      <form className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Basic Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="e.g., US-West-1" required />
              <p className="text-xs text-muted-foreground">Character limits: a-zA-Z0-9_.- and [Space] (min 1, max 100 characters)</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="e.g., Los Angeles, CA" required />
            </div>
            <div className="space-y-2">
              <Label>Node Visibility</Label>
              <RadioGroup name="visibility" defaultValue="Public" className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Public" id="v-public" />
                  <Label htmlFor="v-public">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Private" id="v-private" />
                  <Label htmlFor="v-private">Private</Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground">By setting a node to private you will be denying the ability to auto-deploy to this node.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fqdn">FQDN</Label>
              <Input id="fqdn" name="fqdn" placeholder="node.example.com" required />
              <p className="text-xs text-muted-foreground">Please enter domain name (e.g. node.example.com) to be used for connecting to the daemon.</p>
            </div>
            <div className="space-y-2">
              <Label>Communicate Over SSL</Label>
              <RadioGroup name="ssl-connection" defaultValue="ssl" className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ssl" id="conn-ssl" />
                    <Label htmlFor="conn-ssl">Use SSL Connection</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="http" id="conn-http" />
                    <Label htmlFor="conn-http">Use HTTP Connection</Label>
                </div>
              </RadioGroup>
            </div>
             <div className="space-y-2">
              <Label>Behind Proxy</Label>
              <RadioGroup name="behind-proxy" defaultValue="not-behind" className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not-behind" id="proxy-no" />
                    <Label htmlFor="proxy-no">Not Behind Proxy</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="behind" id="proxy-yes" />
                    <Label htmlFor="proxy-yes">Behind Proxy</Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground">If you are running the daemon behind a proxy such as Cloudflare, select this.</p>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="daemon-dir">Daemon Server File Directory</Label>
                        <Input id="daemon-dir" name="daemon-dir" defaultValue="/var/lib/pterodactyl/volumes" />
                        <p className="text-xs text-muted-foreground">Enter the directory where server files should be stored.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="total-memory">Total Memory (MB)</Label>
                            <Input id="total-memory" name="total-memory" type="number" placeholder="4096" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="memory-overalloc">Memory Over-Allocation (%)</Label>
                            <Input id="memory-overalloc" name="memory-overalloc" type="number" defaultValue="0" />
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Enter the total amount of memory available for new servers. To disable checking for overallocation enter -1.</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="total-disk">Total Disk Space (MB)</Label>
                            <Input id="total-disk" name="total-disk" type="number" placeholder="10240" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="disk-overalloc">Disk Over-Allocation (%)</Label>
                            <Input id="disk-overalloc" name="disk-overalloc" type="number" defaultValue="0" />
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Enter the total amount of disk space available for new servers. To disable checking for overallocation enter -1.</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="daemon-port">Daemon Port</Label>
                            <Input id="daemon-port" name="daemon-port" defaultValue="8080" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sftp-port">Daemon SFTP Port</Label>
                            <Input id="sftp-port" name="sftp-port" defaultValue="2022" />
                        </div>
                    </div>
                     <p className="text-xs text-muted-foreground">The daemon runs its own SFTP management container and does not use the same port that you have assigned for your physical server's SSH process.</p>
                </CardContent>
            </Card>
            <div className="flex justify-end">
                <Button type="submit">Create Node</Button>
            </div>
        </div>
      </form>
    </div>
  );
}
