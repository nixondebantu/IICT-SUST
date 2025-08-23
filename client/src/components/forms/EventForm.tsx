// src/components/forms/EventForm.tsx

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useTagsAction from "@/hooks/useTagsAction.hook";
import { EventReq, EventRes } from "@/lib/dtos/event.dto";
import { createEventValidator } from "@/lib/validators/event.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { RichTextEditor } from "../tiptap-extensions/rich-text-editor";
import TagCreationForm from "./TagCreationForm";

type Props = {
  initialValues?: EventRes;
  onSubmit: (data: EventReq) => void;
  isLoading?: boolean;
};

// Helper to format date for datetime-local input
const formatDateForInput = (dateStr?: string) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return format(date, "yyyy-MM-dd'T'HH:mm");
  } catch {
    return "";
  }
};

export default function EventForm({ initialValues, onSubmit, isLoading }: Props) {
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const { useTagsListQuery } = useTagsAction();
  const { data: tagsData, isLoading: isLoadingTags } = useTagsListQuery({
    type: "event",
  });

  const form = useForm<EventReq>({
    resolver: zodResolver(createEventValidator),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      imageUrl: "",
      cta_title: "",
      cta_url: "",
      contact_number: "",
      contact_mail: "",
      contact_person_name: "",
      files: [],
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.reset({
        title: initialValues.title,
        description: initialValues.description,
        start_time: new Date(initialValues.start_time),
        end_time: new Date(initialValues.end_time),
        location: initialValues.location,
        imageUrl: initialValues.imageUrl,
        tag_id: initialValues.tag.id ,
        capacity: initialValues.capacity || undefined,
        cta_title: initialValues.cta_title ,
        cta_url: initialValues.cta_url ,
        contact_number: initialValues.contact_number || undefined,
        contact_mail: initialValues.contact_mail || undefined,
        contact_person_name: initialValues.contact_person_name || undefined,
        files: initialValues.files || [],
      });
    }
  }, [initialValues, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "files",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the event title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={formatDateForInput(field.value?.toISOString())}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={formatDateForInput(field.value?.toISOString())}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., IICT Seminar Hall" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity (Optional)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tag_id"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between mb-2">
                  <FormLabel>Category / Tag</FormLabel>
                  <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
                    <DialogTrigger asChild>
                      <Button type="button" variant="outline" size="sm">Add New Tag</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>Create New Event Tag</DialogTitle></DialogHeader>
                      <TagCreationForm type="event" onSuccess={() => setIsTagDialogOpen(false)} />
                    </DialogContent>
                  </Dialog>
                </div>
                <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>{isLoadingTags ? 'Loading...' : <SelectValue placeholder="Select a category" />}</SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(tagsData ?? []).map((tag) => (
                      <SelectItem key={tag.id} value={tag.id.toString()}>{tag.value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.png" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cta_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CTA Button Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Register Now" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cta_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CTA Button URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/register" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact_person_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="+880123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_mail"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Contact Email (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="contact@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Provide a detailed description for the event..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Attachments</h3>
            <Button type="button" variant="outline" size="sm" onClick={() => append({ title: "", url: "" })}>Add File</Button>
          </div>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start rounded-md border p-4">
                <div className="flex-grow space-y-4">
                  <FormField control={form.control} name={`files.${index}.title`} render={({ field }) => (<Input placeholder="File Title" {...field} />)} />
                  <FormField control={form.control} name={`files.${index}.url`} render={({ field }) => (<Input placeholder="File URL" {...field} />)} />
                </div>
                <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>Remove</Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? "Saving..." : initialValues ? "Update Event" : "Create Event"}
          </Button>
        </div>
      </form>
    </Form>
  );
}