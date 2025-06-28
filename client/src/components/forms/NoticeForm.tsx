import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useTagsAction from "@/hooks/useTagsAction.hook";
import { NoticeReq, NoticeRes } from "@/lib/dtos/notice.dto";
import { createNoticeValidator } from "@/lib/validators/notice.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { RichTextEditor } from "../tiptap-extensions/rich-text-editor";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import TagCreationForm from "./TagCreationForm";
import { format } from "date-fns";

type Props = {
  initialValues?: NoticeRes;
  onSubmit: (data: NoticeReq) => void;
  isLoading?: boolean;
};

export default function NoticeForm({
  initialValues,
  onSubmit,
  isLoading,
}: Props) {
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const { useTagsListQuery } = useTagsAction();
  const { data: tagsData, isLoading: isLoadingTags } = useTagsListQuery({
    type: "notice",
  });

  const form = useForm<NoticeReq>({
    resolver: zodResolver(createNoticeValidator),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      date: initialValues?.date ? new Date(initialValues.date) : new Date(),
      tagIds: initialValues?.tags?.map((tag) => tag.id) || [],
      files: initialValues?.files || [],
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.reset({
        title: initialValues.title,
        description: initialValues.description,
        date: new Date(initialValues.date),
        tagIds: initialValues.tags?.map((tag) => tag.id) || [],
        files: initialValues.files || [],
      });
    }
  }, [initialValues, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "files",
  });

  // Helper function to format date for the input
  const formatDateForInput = (date: Date | null | undefined) => {
    if (!date) return "";
    try {
      // Ensure we have a valid Date object before formatting
      return format(new Date(date), "yyyy-MM-dd");
    } catch {
      return "";
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter the notice title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notice Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  className="w-fit"
                  {...field}
                  value={formatDateForInput(field.value)}
                  onChange={(e) => {
                    // Convert the input string back to a Date object, accounting for timezones.
                    const date = e.target.value
                      ? new Date(e.target.value + "T00:00:00")
                      : null;
                    field.onChange(date);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tagIds"
          render={() => (
            <FormItem>
              <div className="flex items-center justify-between mb-2">
                <FormLabel>Tags</FormLabel>
                <Dialog
                  open={isTagDialogOpen}
                  onOpenChange={setIsTagDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button type="button" variant="outline" size="sm">
                      Add New Tag
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create a New Tag</DialogTitle>
                    </DialogHeader>
                    <TagCreationForm
                      type="notice"
                      onSuccess={() => setIsTagDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="mt-2 space-y-2 rounded-md border p-4 min-h-[80px]">
                {isLoadingTags ? (
                  <p className="text-sm text-muted-foreground">
                    Loading tags...
                  </p>
                ) : (tagsData ?? []).length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No tags available.
                  </p>
                ) : (
                  (tagsData ?? []).map((tag) => (
                    <FormField
                      key={tag.id}
                      control={form.control}
                      name="tagIds"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(tag.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field.value ?? []),
                                        tag.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (id) => id !== tag.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {tag.value}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
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
                  placeholder="Provide a detailed description for the notice..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Attachments</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ title: "", url: "" })}
            >
              Add File
            </Button>
          </div>
          <div className="space-y-4">
            {fields.length === 0 && (
              <div className="text-center text-sm text-muted-foreground p-4 border rounded-md">
                No files have been added.
              </div>
            )}
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-2 items-start rounded-md border p-4"
              >
                <div className="flex-grow space-y-4">
                  <FormField
                    control={form.control}
                    name={`files.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="File Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`files.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="File URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading
              ? "Saving..."
              : initialValues
              ? "Update Notice"
              : "Create Notice"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
