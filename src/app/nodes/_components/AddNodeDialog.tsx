
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Node name is required"),
  url: z.string().min(1, "Node URL is required"),
});

type AddNodeFormValues = z.infer<typeof formSchema>;

interface AddNodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddNode: (data: AddNodeFormValues) => void;
}

export default function AddNodeDialog({ open, onOpenChange, onAddNode }: AddNodeDialogProps) {
  const { toast } = useToast();
  const form = useForm<AddNodeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  const onSubmit = (data: AddNodeFormValues) => {
    onAddNode(data);
    toast({
        title: "Node Added",
        description: `The node "${data.name}" has been successfully added.`,
    })
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New Node</DialogTitle>
              <DialogDescription>
                Enter the details for the new node.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., US-East-1" className="col-span-3" />
                    </FormControl>
                    <div className="col-start-2 col-span-3">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">URL / IP</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 192.168.1.10" className="col-span-3" />
                    </FormControl>
                     <div className="col-start-2 col-span-3">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Add Node</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
