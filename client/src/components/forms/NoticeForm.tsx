import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { noticeFormValidator, NoticeFormValues } from "@/lib/validators/notice.validator";
import { Notice } from "@/lib/dtos/notice.dto"; // Your Notice DTO
import { cn } from "@/lib/utils"; // Your shadcn utility function

// UI Components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

interface NoticeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData, isEditing: boolean) => void;
  initialData?: Notice | null;
  isSubmitting: boolean;
}

export function NoticeForm({ isOpen, onClose, onSubmit, initialData, isSubmitting }: NoticeFormProps) {
  const isEditing = !!initialData;

  const form = useForm<NoticeFormValues>({
    resolver: zodResolver(noticeFormValidator),
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditing && initialData) {
        form.reset({
          title: initialData.title,
          description: initialData.description ?? "",
          date: new Date(initialData.date), // Convert date string to Date object for the form
          file: undefined,
        });
      } else {
        form.reset({ title: "", description: "", date: new Date(), file: undefined });
      }
    }
  }, [isOpen, isEditing, initialData, form]);

  const handleSubmit = (values: NoticeFormValues) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description || "");
    formData.append("date", values.date.toISOString()); // Convert Date object back to ISO string for backend
    if (values.file && values.file.length > 0) {
      formData.append("file", values.file[0]);
    }
    onSubmit(formData, isEditing);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Notice" : "Create New Notice"}</DialogTitle>
          <DialogDescription>
            Fill in the details for the notice. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Title*</FormLabel>
                  <FormControl><Input placeholder="e.g., Fall Admission Schedule" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Notice Date*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea placeholder="Add a detailed description..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="file" render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachment (PDF, etc.)</FormLabel>
                  <FormControl>
                    <Input type="file" onChange={(e) => field.onChange(e.target.files)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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