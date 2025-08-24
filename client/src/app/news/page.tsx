// src/app/news/page.tsx

import useNewsAction from "@/hooks/useNewsAction.hook";
import { QueryParams } from "@/lib/dtos/query.dto";
import { AlertCircle, Loader2 } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

// Import the new components
import EventsPagination from "@/components/pages/events/events-pagination"; // Reusing the pagination component
import NewsCard from "@/components/pages/news/news-card";
import NewsPageHeader from "@/components/pages/news/news-page-header";

export default function NewsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { useNewsListQuery } = useNewsAction();

  // The data fetching logic remains exactly the same
  const queryParams: QueryParams = useMemo(() => ({
    page: Number(searchParams.get("page") || "1"),
    limit: 10, // Let's show 10 per page in this list view
    search: searchParams.get("search") || undefined,
    sortBy: "date",
    order: "desc",
  }), [searchParams]);

  const { data: newsResponse, isLoading, isError, error } = useNewsListQuery(queryParams);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load news", { description: error?.message });
    }
  }, [isError, error]);

  const handlePageChange = useCallback((page: number) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', page.toString());
      return newParams;
    });
  }, [setSearchParams]);

  const newsData = newsResponse?.result || [];
  const totalPages = newsResponse?.totalPages || 1;
  const isInitialLoading = isLoading && !newsResponse;

  return (
    <main className="pb-12 bg-gray-50 min-h-screen">
      <NewsPageHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Render loading state */}
        {isInitialLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        )}

        {/* Render error state */}
        {isError && newsData.length === 0 && (
          <div className="text-center py-20">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Failed to Load News</h2>
          </div>
        )}
        
        {/* Render the news grid if data is available */}
        {!isInitialLoading && !isError && (
          newsData.length > 0 ? (
            <div id="news-grid" className="space-y-6">
              {newsData.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold">No News Found</h2>
              <p className="text-muted-foreground mt-2">There are currently no news articles to display.</p>
            </div>
          )
        )}
      </div>

      {/* Render pagination if there is more than one page */}
      {totalPages > 1 && !isError && (
        <div className="mt-8">
          <EventsPagination 
            currentPage={queryParams.page || 1} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </div>
      )}
    </main>
  );
}