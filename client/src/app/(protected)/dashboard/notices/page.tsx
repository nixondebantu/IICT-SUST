import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, PlusCircle, Trash2, File as FileIcon } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Notice } from "@/lib/dtos/notice.dto"; // Adjust path if needed
import noticeService from "@/lib/services/notice.service"; // Adjust path if needed
import { NoticeForm } from "@/components/forms/NoticeForm";

function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingNoticeId, setDeletingNoticeId] = useState<number | null>(null);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const data = await noticeService.getNotices();
      setNotices(data);
    } catch (error) {
      toast.error("Failed to fetch notices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleCreate = () => {
    setEditingNotice(null);
    setIsFormOpen(true);
  };

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeletingNoticeId(id);
    setIsAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingNoticeId) return;
    try {
      await noticeService.deleteNotice(deletingNoticeId);
      toast.success("Notice deleted successfully!");
      fetchNotices();
    } catch (error) {
      toast.error("Failed to delete notice.");
    } finally {
      setIsAlertOpen(false);
      setDeletingNoticeId(null);
    }
  };

  const handleFormSubmit = async (formData: FormData, isEditing: boolean) => {
    setIsSubmitting(true);
    try {
      if (isEditing && editingNotice) {
        await noticeService.updateNotice(editingNotice.id, formData);
        toast.success("Notice updated successfully!");
      } else {
        await noticeService.createNotice(formData);
        toast.success("Notice created successfully!");
      }
      setIsFormOpen(false);
      fetchNotices();
    } catch (error) {
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} notice.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col max-w-7xl p-6 gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild to={""}><Link to="/dashboard">Dashboard</Link></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage><Badge className="shadow-none rounded-sm">Notices</Badge></BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Notices</h1>
        <Button onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Notice Board</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="w-[150px]">Date</TableHead>
                <TableHead className="w-[120px]">Attachment</TableHead>
                <TableHead className="text-right w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center h-24">Loading notices...</TableCell></TableRow>
              ) : notices.length > 0 ? (
                notices.map((notice) => (
                  <TableRow key={notice.id}>
                    <TableCell className="font-medium">{notice.title}</TableCell>
                    <TableCell>{new Date(notice.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {notice.file_url && (
                        <a href={notice.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline">
                          <FileIcon className="h-4 w-4 mr-1" /> View File
                        </a>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(notice)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(notice.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={4} className="text-center h-24">No notices found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NoticeForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} initialData={editingNotice} isSubmitting={isSubmitting} />
      
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete the notice.</AlertDialogDescription>
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

export default NoticesPage;