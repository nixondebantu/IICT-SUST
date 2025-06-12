import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
// --- CHANGE HERE ---
import { toast } from "sonner"; // Changed from 'react-hot-toast'

// UI Components
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// App-specific imports
import { CarouselSlide } from "@/lib/dtos/carousel.dto"; // Adjust path if needed
import carouselService from "@/lib/services/carousel.service"; // Adjust path if needed
import { CarouselForm } from "@/components/forms/CarouselForm";

function Carousel() {
  // State (no changes here)
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingSlide, setEditingSlide] = useState<CarouselSlide | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingSlideId, setDeletingSlideId] = useState<number | null>(null);

  // Fetch data
  const fetchSlides = async () => {
    try {
      setLoading(true);
      const data = await carouselService.getSlides();
      setSlides(data);
    } catch (error) {
      // This now uses sonner
      toast.error("Failed to fetch slides.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // Handlers (no changes in logic, just the toast function is from sonner)
  const handleCreate = () => {
    setEditingSlide(null);
    setIsFormOpen(true);
  };

  const handleEdit = (slide: CarouselSlide) => {
    setEditingSlide(slide);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeletingSlideId(id);
    setIsAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingSlideId) return;
    try {
      await carouselService.deleteSlide(deletingSlideId);
      toast.success("Slide deleted successfully!");
      fetchSlides(); // Re-fetch data
    } catch (error) {
      toast.error("Failed to delete slide.");
    } finally {
      setIsAlertOpen(false);
      setDeletingSlideId(null);
    }
  };

  const handleFormSubmit = async (formData: FormData, isEditing: boolean) => {
    setIsSubmitting(true);
    try {
      if (isEditing && editingSlide) {
        await carouselService.updateSlide(editingSlide.id, formData);
        toast.success("Slide updated successfully!");
      } else {
        await carouselService.createSlide(formData);
        toast.success("Slide created successfully!");
      }
      setIsFormOpen(false);
      fetchSlides(); // Re-fetch data
    } catch (error) {
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} slide.`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    // The JSX remains exactly the same as before
    <div className="flex flex-col max-w-7xl p-6 gap-4">
      {/* Breadcrumbs and Header */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild to={""}>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Badge className="shadow-none rounded-sm">Carousel</Badge>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Carousel</h1>
        <Button onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New
        </Button>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Carousel Slides</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>
              ) : slides.length > 0 ? (
                slides.map((slide) => (
                  <TableRow key={slide.id}>
                    <TableCell>
                      <img src={slide.image_url} alt={slide.title} className="h-10 w-16 object-cover rounded"/>
                    </TableCell>
                    <TableCell className="font-medium">{slide.title}</TableCell>
                    <TableCell>{slide.description}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(slide)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(slide.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={4} className="text-center">No slides found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Form Dialog */}
      <CarouselForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingSlide}
        isSubmitting={isSubmitting}
      />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the carousel slide.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Carousel;
