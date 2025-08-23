// src/components/pages/news/news-list-table.tsx

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDebounce } from "@/hooks/useDebounce.hook";
import useNewsAction from "@/hooks/useNewsAction.hook";
import { Edit, Eye, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NewsListTable() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { useNewsListQuery, useDeleteNewsMutation } = useNewsAction();
  const { mutate: deleteNews } = useDeleteNewsMutation();
  const { data: newsData, isLoading, isFetching } = useNewsListQuery({
    page,
    limit: 10,
    sortBy: "date",
    order: "desc",
    search: debouncedSearchTerm,
  });

  useEffect(() => {
    if (debouncedSearchTerm !== undefined) setPage(1);
  }, [debouncedSearchTerm]);

  const newsArticles = newsData?.result ?? [];
  const totalPages = newsData?.totalPages ?? 1;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>All News</CardTitle>
        <CardDescription>Browse, search, and manage all news articles.</CardDescription>
        <div className="w-full max-w-sm mt-4 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-8" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="text-center"><Skeleton className="h-5 w-24 mx-auto" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : newsArticles.length > 0 ? (
                newsArticles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell><Badge variant="secondary">{article.tag.value}</Badge></TableCell>
                    <TableCell className="text-center">{new Date(article.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/news/${article.id}`} title="View Public Page"><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                        <Link to={`/dashboard/news/${article.id}`} title="Edit"><Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button></Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" title="Delete"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the news article.</AlertDialogDescription></AlertDialogHeader>
                            <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => deleteNews(article.id)}>Continue</AlertDialogAction></AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={4} className="h-24 text-center">No news found.</TableCell></TableRow>
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