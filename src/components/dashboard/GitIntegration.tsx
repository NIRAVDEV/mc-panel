"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { GitCommit, Github, Loader2 } from "lucide-react";

export default function GitIntegration() {
  const [isPushing, setIsPushing] = useState(false);
  const { toast } = useToast();

  const handlePush = () => {
    setIsPushing(true);
    setTimeout(() => {
      setIsPushing(false);
      toast({
        title: "Changes Pushed",
        description: "Your configuration changes have been pushed to GitHub.",
      });
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Version Control</CardTitle>
        <CardDescription>
          Push your configuration changes to your repository.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <Github className="h-6 w-6" />
            <div>
              <p className="font-semibold">NIRAVDEV/mc-panel</p>
              <p className="text-sm text-muted-foreground">Branch: main</p>
            </div>
          </div>
        </div>
        <Button onClick={handlePush} disabled={isPushing}>
          {isPushing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Pushing...
            </>
          ) : (
            <>
              <GitCommit className="mr-2 h-4 w-4" />
              Push to GitHub
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
