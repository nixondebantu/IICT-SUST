// src/components/forms/NewsForm.tsx

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useTagsAction from "@/hooks/useTagsAction.hook";
import { NewsReq, NewsRes } from "@/lib/dtos/news.dto";

import { createNewsValidator } from "@/lib/validators/news.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RichTextEditor } from "../tiptap-extensions/rich-text-editor";
import TagCreationForm from "./TagCreationForm";

type Props = {
  initialValues?: NewsRes;
  onSubmit: (data: NewsReq) => void;
  isLoading?: boolean;
};

const formatDateForInput = (date: Date | string | null | undefined) => {
  if (!date) return "";
  try {
    return format(new Date(date), "yyyy-MM-dd");
  } catch {
    return "";
  }
};

export default function NewsForm({ initialValues, onSubmit, isLoading }: Props) {
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const { useTagsListQuery } = useTagsAction();
  const { data: tagsData, isLoading: isLoadingTags } = useTagsListQuery({ type: "news" });

  const form = useForm<NewsReq>({
    resolver: zodResolver(createNewsValidator),
    defaultValues: {
      title: "",
      content: "",
      image_url: "",
      date: new Date(),
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.reset({
        title: initialValues.title,
        content: initialValues.content,
        image_url: initialValues.image_url,
        date: new Date(initialValues.date),
        tag_id: initialValues.tag.id,
      });
    }
  }, [initialValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>News Title</FormLabel>
              <FormControl><Input placeholder="Enter the news title" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publication Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="w-fit"
                    {...field}
                    value={formatDateForInput(field.value)}
                    onChange={(e) => field.onChange(new Date(e.target.value + "T00:00:00"))}
                  />
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
                    <DialogTrigger asChild><Button type="button" variant="outline" size="sm">Add New Tag</Button></DialogTrigger>
                    <DialogContent><DialogHeader><DialogTitle>Create New News Tag</DialogTitle></DialogHeader><TagCreationForm type="news" onSuccess={() => setIsTagDialogOpen(false)} /></DialogContent>
                  </Dialog>
                </div>
                <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                  <FormControl><SelectTrigger>{isLoadingTags ? 'Loading...' : <SelectValue placeholder="Select a category" />}</SelectTrigger></FormControl>
                  <SelectContent>
                    {(tagsData ?? []).map((tag) => <SelectItem key={tag.id} value={tag.id.toString()}>{tag.value}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl><Input placeholder="https://example.com/image.png" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl><RichTextEditor value={field.value} onChange={field.onChange} placeholder="Write the full news article here..." /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? "Saving..." : initialValues ? "Update News" : "Create News"}
          </Button>
        </div>
      </form>
    </Form>
  );
}