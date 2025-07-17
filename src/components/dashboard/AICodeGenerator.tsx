"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateConfiguration } from "@/ai/flows/generate-configuration";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function AICodeGenerator() {
  const [description, setDescription] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description for the configuration.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setGeneratedCode("");
    try {
      const result = await generateConfiguration({ description });
      setGeneratedCode(result.configurationCode);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate configuration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>AI-Assisted Configuration</CardTitle>
        <CardDescription>
          Describe the configuration you need in plain language, and our AI will
          generate it for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="description">Your Description</Label>
          <Textarea
            placeholder="e.g., 'Create a nginx config that proxies to a node app on port 3000'"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[120px] focus-visible:ring-primary"
          />
        </div>
        <div className="flex-grow">
          <Label>Generated Configuration</Label>
          <div className="relative mt-1.5 w-full rounded-md border bg-muted min-h-[200px] p-4 font-mono text-sm">
            {isLoading && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-10/12" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            )}
            {generatedCode && <pre><code>{generatedCode}</code></pre>}
            {!isLoading && !generatedCode && (
              <p className="text-muted-foreground">
                Your code will appear here...
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
