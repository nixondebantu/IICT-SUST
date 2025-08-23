// src/app/news/page.tsx

"use client";

import EventsPagination from "@/components/pages/events/events-pagination"; // Reusable
import NewsList from "@/components/pages/news/news-list";
import useNewsAction from "@/hooks/useNewsAction.hook";
import { QueryParams } from "@/lib/dtos/query.dto";
import { AlertCircle, Loader2 } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function NewsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { useNewsListQuery } = useNewsAction();

  const queryParams: QueryParams = useMemo(() => ({
    page: Number(searchParams.get("page") || "1"),
    limit: 9,
    search: searchParams.get("search") || undefined,
    sortBy: "date",
    order: "desc",
  }), [searchParams]);

  const { data: newsResponse, isLoading, isError, error, isFetching } = useNewsListQuery(queryParams);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load news", { description: error?.message });
    }
  }, [isError, error]);

  const handleQueryChange = useCallback((name: string, value: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (value) newParams.set(name, value);
      else newParams.delete(name);
      if (name !== 'page') newParams.set('page', '1');
      return newParams;
    });
  }, [setSearchParams]);

  const newsData = newsResponse?.result || [];
  const totalPages = newsResponse?.totalPages || 1;
  const isInitialLoading = isLoading && !newsResponse;

  return (
    <div>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Latest News & Updates</h1>
          <p className="text-xl opacity-90">Stay informed with the latest happenings at IICT.</p>
        </div>
      </section>
      
      {/* You can create a NewsSearchFilter component similar to the events one if needed */}

      {isInitialLoading ? (
        <div className="flex justify-center items-center py-20"><Loader2 className="w-12 h-12 animate-spin text-primary" /></div>
      ) : isError && newsData.length === 0 ? (
        <div className="container mx-auto text-center py-20"><AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" /><h2 className="text-xl font-semibold">Failed to Load News</h2></div>
      ) : (
        <NewsList news={newsData} isLoading={isFetching} />
      )}

      {totalPages > 1 && !isError && (
        <EventsPagination currentPage={queryParams.page || 1} totalPages={totalPages} onPageChange={(page) => handleQueryChange("page", page.toString())} />
      )}
    </div>
  );
}