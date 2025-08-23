import useTagsAction from "@/hooks/useTagsAction.hook";
import { TagCreateValidator, TagReq } from "@/lib/dtos/tag.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface TagCreationFormProps {
  type: "notice" | "news" |"event";
  onSuccess: () => void;
}
export default function TagCreationForm({
  type,
  onSuccess,
}: TagCreationFormProps) {
  const form = useForm<TagReq>({
    resolver: zodResolver(TagCreateValidator),
    defaultValues: {
      value: "",
      type: type,
    },
  });

  const { useTagCreateMutation } = useTagsAction();
  const { mutate, isPending } = useTagCreateMutation;

  const handleSubmit = (data: TagReq) => {
    console.log("Submitting tag creation:", data);
    mutate(data, {
      onSuccess: () => {
        onSuccess();
      },
      onError: (error) => {
        console.error("Error creating tag:", error);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter tag title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="button"
          onClick={form.handleSubmit(handleSubmit)}
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Tag"}
        </Button>
      </form>
    </Form>
  );
}
