import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { DirectorMessage } from "@/lib/dtos/directorMessage.dto"; // Adjust path if needed
import { DirectorMessageFormValues } from "@/lib/validators/directorMessage.validator"; // Adjust path if needed
import directorMessageService from "@/lib/services/directorMessage.service"; // Adjust path if needed
import { DirectorMessageForm } from "@/components/forms/DirectorMessageForm";

function DirectorMessagePage() {
  const [message, setMessage] = useState<DirectorMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMessage = async () => {
    try {
      setLoading(true);
      const data = await directorMessageService.getMessage();
      setMessage(data);
    } catch (error) {
      toast.error("Failed to fetch director's message.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  const handleFormSubmit = async (data: DirectorMessageFormValues) => {
    setIsSubmitting(true);
    try {
      // If a message exists, update it. Otherwise, create a new one.
      if (message) {
        await directorMessageService.updateMessage(message.id, data);
        toast.success("Message updated successfully!");
      } else {
        await directorMessageService.createMessage(data);
        toast.success("Message created successfully!");
      }
      setIsFormOpen(false);
      fetchMessage(); // Re-fetch the message to show the latest data
    } catch (error: any) {
      // Handle the specific 409 Conflict error from the backend
      if (error.response && error.response.status === 409) {
        toast.error("Conflict: A message already exists.", {
          description: "Please refresh the page and edit the existing message.",
        });
      } else {
        toast.error(`Failed to ${message ? 'update' : 'create'} message.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col max-w-4xl p-6 gap-4 mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild to={""}><Link to="/dashboard">Dashboard</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage><Badge className="shadow-none rounded-sm">Director's Message</Badge></BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Director's Message</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Message</CardTitle>
          <CardDescription>This is the single message that will be displayed on the public website.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[200px]">
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : message ? (
            <blockquote className="mt-6 border-l-2 pl-6 italic whitespace-pre-wrap">
              {message.message}
            </blockquote>
          ) : (
            <div className="text-center text-muted-foreground py-10">
              <p>No message has been set.</p>
              <Button className="mt-4" onClick={() => setIsFormOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Message
              </Button>
            </div>
          )}
        </CardContent>
        {message && !loading && (
          <CardFooter className="border-t px-6 py-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              <p>Last updated by: {message.creator?.name || "Unknown"}</p>
              <p>On: {new Date(message.created_at).toLocaleDateString()}</p>
            </div>
            <Button variant="outline" onClick={() => setIsFormOpen(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Message
            </Button>
          </CardFooter>
        )}
      </Card>
      
      <DirectorMessageForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={message}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default DirectorMessagePage;