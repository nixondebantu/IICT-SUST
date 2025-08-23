// src/components/pages/events/event-list-table.tsx

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/hooks/useDebounce.hook";
import useEventAction from "@/hooks/useEventAction.hook";
import { Edit, Eye, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EventListTable() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { useEventListQuery, useDeleteEventMutation } = useEventAction();
  const { mutate: deleteEvent } = useDeleteEventMutation();
  const {
    data: eventsData,
    isLoading,
    isFetching,
  } = useEventListQuery({
    page,
    limit,
    sortBy: "start_time",
    order: "desc",
    search: debouncedSearchTerm,
  });

  useEffect(() => {
    if (debouncedSearchTerm !== undefined) setPage(1);
  }, [debouncedSearchTerm]);

  const events = eventsData?.result ?? [];
  const totalPages = eventsData?.totalPages ?? 1;

  const handleDelete = (eventId: number) => {
    deleteEvent(eventId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Events</CardTitle>
        <CardDescription>Browse, search, and manage all company events.</CardDescription>
        <div className="w-full max-w-sm mt-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-center">Start Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: limit }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell className="text-center"><Skeleton className="h-5 w-24 mx-auto" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : events.length > 0 ? (
                events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell><Badge variant="secondary">{event.tag.value}</Badge></TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell className="text-center">
                      {new Date(event.start_time).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/events/${event.id}`} title="View Public Page"><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                        <Link to={`/dashboard/events/${event.id}`} title="Edit"><Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button></Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" title="Delete"><Trash2 className="h-4 w-4" /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>This will permanently delete the event.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(event.id)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={5} className="h-24 text-center">No events found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Page <strong>{page}</strong> of <strong>{totalPages}</strong></div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page <= 1 || isLoading || isFetching}>Previous</Button>
          <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page >= totalPages || isLoading || isFetching}>Next</Button>
        </div>
      </CardFooter>
    </Card>
  );
}