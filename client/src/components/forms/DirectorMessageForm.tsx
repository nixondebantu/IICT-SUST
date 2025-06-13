import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { directorMessageFormValidator, DirectorMessageFormValues } from "@/lib/validators/directorMessage.validator";
import { DirectorMessage } from "@/lib/dtos/directorMessage.dto"; // Your DirectorMessage DTO

// UI Components
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface DirectorMessageFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DirectorMessageFormValues) => void;
  initialData?: DirectorMessage | null;
  isSubmitting: boolean;
}

export function DirectorMessageForm({ isOpen, onClose, onSubmit, initialData, isSubmitting }: DirectorMessageFormProps) {
  const form = useForm<DirectorMessageFormValues>({
    resolver: zodResolver(directorMessageFormValidator),
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        message: initialData?.message ?? "",
      });
    }
  }, [isOpen, initialData, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={false}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit" : "Create"} Director's Message</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="message" render={({ field }) => (
              <FormItem>
                <FormLabel>Message*</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write the welcome message..." {...field} rows={10} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}