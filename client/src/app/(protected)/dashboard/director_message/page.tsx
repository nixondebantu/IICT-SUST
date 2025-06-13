import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

// UI Components
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// App-specific imports
import { DirectorMessage } from "@/lib/dtos/directorMessage.dto"; // Adjust path if needed
import directorMessageService from "@/lib/services/directorMessage.service"; // Adjust path if needed
import { DirectorMessageForm } from "@/components/forms/DirectorMessageForm";

function DirectorMessagePage() {
  const [messages, setMessages] = useState<DirectorMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingMessage, setEditingMessage] = useState<DirectorMessage | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingMessageId, setDeletingMessageId] = useState<number | null>(null);

  const fetchMessages = async () => {
    try { setLoading(true); setMessages(await directorMessageService.getMessages()); } 
    catch (error) { toast.error("Failed to fetch messages."); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleCreate = () => { setEditingMessage(null); setIsFormOpen(true); };
  const handleEdit = (msg: DirectorMessage) => { setEditingMessage(msg); setIsFormOpen(true); };
  const handleDelete = (id: number) => { setDeletingMessageId(id); setIsAlertOpen(true); };

  const confirmDelete = async () => {
    if (!deletingMessageId) return;
    try {
      await directorMessageService.deleteMessage(deletingMessageId);
      toast.success("Message deleted!");
      fetchMessages();
    } catch (error) {
      toast.error("Failed to delete message.");
    } finally {
      setIsAlertOpen(false);
      setDeletingMessageId(null);
    }
  };

  const handleFormSubmit = async (formData: FormData, isEditing: boolean) => {
    setIsSubmitting(true);
    try {
      if (isEditing && editingMessage) {
        await directorMessageService.updateMessage(editingMessage.id, formData);
        toast.success("Message updated!");
      } else {
        await directorMessageService.createMessage(formData);
        toast.success("Message created!");
      }
      setIsFormOpen(false);
      fetchMessages();
    } catch (error) {
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} message.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col max-w-7xl p-6 gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild to={""}><Link to="/dashboard">Dashboard</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage><Badge className="shadow-none rounded-sm">Director's Message</Badge></BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Director's Message</h1>
        <Button onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Stored Messages</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead className="text-right w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? ( <TableRow><TableCell colSpan={5} className="text-center h-24">Loading...</TableCell></TableRow> ) 
              : messages.length > 0 ? (
                messages.map((msg) => (
                  <TableRow key={msg.id}>
                    <TableCell>
                      {msg.image_url ? (
                        <img src={msg.image_url} alt={msg.name} className="h-12 w-12 object-cover rounded-full"/>
                      ) : (
                        <div className="h-12 w-12 bg-muted rounded-full"/>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{msg.name}</TableCell>
                    <TableCell>{msg.designation}</TableCell>
                    <TableCell>
                      <Badge variant={msg.is_active ? "default" : "secondary"} className={msg.is_active ? "bg-green-600" : ""}>
                        {msg.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(msg)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(msg.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : ( <TableRow><TableCell colSpan={5} className="text-center h-24">No messages found.</TableCell></TableRow> )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DirectorMessageForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} initialData={editingMessage} isSubmitting={isSubmitting} />
      
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete this message.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DirectorMessagePage;