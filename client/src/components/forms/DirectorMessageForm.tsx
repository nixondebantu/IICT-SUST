import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { directorMessageFormValidator, DirectorMessageFormValues } from "@/lib/validators/directorMessage.validator";
import { DirectorMessage } from "@/lib/dtos/directorMessage.dto"; // Your DirectorMessage DTO

// UI Components
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface DirectorMessageFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData, isEditing: boolean) => void;
  initialData?: DirectorMessage | null;
  isSubmitting: boolean;
}

export function DirectorMessageForm({ isOpen, onClose, onSubmit, initialData, isSubmitting }: DirectorMessageFormProps) {
  const isEditing = !!initialData;

  const form = useForm<DirectorMessageFormValues>({
    resolver: zodResolver(directorMessageFormValidator),
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditing && initialData) {
        form.reset({
          name: initialData.name,
          designation: initialData.designation,
          message: initialData.message,
          is_active: initialData.is_active,
          image: undefined,
        });
      } else {
        form.reset({ name: "", designation: "", message: "", is_active: false, image: undefined });
      }
    }
  }, [isOpen, isEditing, initialData, form]);

  const handleSubmit = (values: DirectorMessageFormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("designation", values.designation);
    formData.append("message", values.message);
    formData.append("is_active", String(values.is_active ?? false));
    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0]);
    }
    onSubmit(formData, isEditing);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={false}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Message" : "Create New Message"}</DialogTitle>
          <DialogDescription>
            Only one message can be active at a time.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Name*</FormLabel><FormControl><Input placeholder="e.g., Prof. John Doe, PhD" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="designation" render={({ field }) => (
              <FormItem><FormLabel>Designation*</FormLabel><FormControl><Input placeholder="e.g., Director, IICT, SUST" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="message" render={({ field }) => (
              <FormItem><FormLabel>Message*</FormLabel><FormControl><Textarea placeholder="Write the welcome message..." {...field} rows={6} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="image" render={({ field }) => (
              <FormItem><FormLabel>Director's Photo</FormLabel><FormControl><Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="is_active" render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5"><FormLabel>Set as Active Message</FormLabel></div>
                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
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