// components/pages/notices/notice-list-table.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useNoticeAction from "@/hooks/useNoticeAction.hook";
import { useDebounce } from "@/hooks/useDebounce.hook";

// UI Components
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Icons
import { MoreHorizontal, Edit, Trash2, Eye, Search } from "lucide-react";

function NoticeListTable() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // This effect correctly resets pagination when a new search is initiated.
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [debouncedSearchTerm]);

  const { useNoticeListQuery } = useNoticeAction();
  const {
    data: noticesData,
    isLoading,
    isFetching,
  } = useNoticeListQuery({
    page,
    limit,
    sortBy: "date",
    order: "desc",
    search: debouncedSearchTerm,
  });

  const notices = noticesData?.result ?? [];
  const totalPages = noticesData?.totalPages ?? 1;

  // ... (handlePreviousPage, handleNextPage, handleDelete functions as before)
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setPage((prev) => Math.min(prev + 1, totalPages));
  const handleDelete = (noticeId: number) => {
    if (window.confirm(`Are you sure you want to delete notice ${noticeId}?`)) {
      console.log(`Deleting notice ${noticeId}`);
    }
  };

  // Disable pagination/search while a fetch is in progress for better UX
  const isBusy = isLoading || isFetching;

  return (
    // ✅ FIX: Using the Card component provides better structure and avoids overflow issues.
    <Card>
      <CardHeader>
        <CardTitle>All Notices</CardTitle>
        <CardDescription>
          Browse, search, and manage all company notices.
        </CardDescription>
        <div className="relative mt-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-sm pl-8"
            disabled={isBusy}
          />
        </div>
      </CardHeader>
      <CardContent>
        {/* The border is now on a div inside CardContent, which is safe. */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Title</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: limit }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    <TableCell>
                      <Skeleton className="h-5 w-3/4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-2/3" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="h-5 w-24 mx-auto" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-8 w-8 ml-auto rounded-md" />
                    </TableCell>
                  </TableRow>
                ))
              ) : notices.length > 0 ? (
                notices.map((notice) => (
                  <TableRow key={notice.id}>
                    <TableCell className="font-medium">
                      {notice.title}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {notice.tags.map((tag) => (
                          <Badge key={tag.id} variant="secondary">
                            {tag.value}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {new Date(notice.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {/* ✅ FIX: This dropdown will now render correctly above all other content. */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link
                              to={`/dashboard/notices/${notice.id}`}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" /> View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              to={`/dashboard/notices/edit/${notice.id}`}
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-500 cursor-pointer"
                            onClick={() => handleDelete(notice.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No notices found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={page <= 1 || isBusy}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={page >= totalPages || isBusy}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default NoticeListTable;
