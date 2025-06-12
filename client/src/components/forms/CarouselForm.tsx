
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
 createCarouselValidator,
  updateCarouselValidator,
  CarouselFormValues,
} from "@/lib/validators/carousel.validator"; ;
import { CarouselSlide } from "@/lib/dtos/carousel.dto";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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

interface CarouselFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData, isEditing: boolean) => void;
  initialData?: CarouselSlide | null;
  isSubmitting: boolean;
}

const blankFormValues: CarouselFormValues = {
  title: "",
  description: "",
  button_text: "",
  button_link: "",
  image: undefined,
};

export function CarouselForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: CarouselFormProps) {
  const isEditing = !!initialData;

  const form = useForm<CarouselFormValues>({
    resolver: zodResolver(
      isEditing ? updateCarouselValidator : createCarouselValidator
    ),
    defaultValues: blankFormValues,
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditing && initialData) {
        form.reset({
          title: initialData.title,
          description: initialData.description ?? "",
          button_text: initialData.button_text ?? "",
          button_link: initialData.button_link ?? "",
          image: undefined,
        });
      } else {
        form.reset(blankFormValues);
      }
    }
  }, [isOpen, isEditing, initialData, form]);


  const handleSubmit = (values: CarouselFormValues) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description || "");
    formData.append("button_text", values.button_text || "");
    formData.append("button_link", values.button_link || "");
    
    // This now works because the form state is correct
    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0]);
    }

    onSubmit(formData, isEditing);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Slide" : "Create New Slide"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the details for this slide."
              : "Fill in the details for the new slide."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
           
                   <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title*</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Pioneering ICT Education" {...field} />
                  </FormControl>
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
                    <Input placeholder="A short, catchy description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="button_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button Text</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Explore Programs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="button_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button Link</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., /programs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image{isEditing ? "" : "*"}</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      // We must manually handle onChange to pass the FileList
                      onChange={(event) => {
                        field.onChange(event.target.files);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}