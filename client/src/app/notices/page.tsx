import { useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import NoticeFilter from "@/components/pages/notices/notice-filter";
import NoticesList from "@/components/pages/notices/notices-list";
import PageHeading from "@/components/pages/notices/page-heading";
import { toast } from "sonner";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import useNoticeAction from "@/hooks/useNoticeAction.hook";
import { QueryParams } from "@/lib/dtos/query.dto";

export default function NoticePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { useNoticeListQuery } = useNoticeAction();

  const queryParams = useMemo((): QueryParams => {
    const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const searchTerm = searchParams.get("search")?.trim() || "";
    const selectedTags = searchParams.getAll("tag")
      .map(tag => parseInt(tag, 10))
      .filter(tag => !isNaN(tag) && tag > 0);
    const sortBy = searchParams.get("sortBy") || "date";
    const order = (searchParams.get("order") || "desc") as "asc" | "desc";
    const pageSize = Math.max(1, Math.min(50, parseInt(searchParams.get("pageSize") || "10", 10)));

    return {
      page: currentPage,
      limit: pageSize,
      search: searchTerm || undefined,
      tag: selectedTags.length > 0 ? selectedTags : undefined,
      sortBy,
      order
    };
  }, [searchParams]);

  const {
    data: noticesResponse,
    isLoading,
    error,
    isError,
    refetch,
    isFetching,
    isRefetching
  } = useNoticeListQuery(queryParams);

  useEffect(() => {
    if (isError && error && !isFetching) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to load notices. Please try again.";

      toast.error("Failed to load notices", {
        description: errorMessage,
        action: {
          label: "Retry",
          onClick: () => refetch()
        },
        duration: 5000,
      });
    }
  }, [isError, error, isFetching, refetch]);

  const handleRefresh = useCallback(async () => {
    try {
      await refetch();
      if (!isError) {
        toast.success("Notices refreshed successfully");
      }
    } catch (error) {
      console.error("Refresh failed:", error);
    }
  }, [refetch, isError]);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);


  const handlePageChange = useCallback((page: number) => {
    if (page < 1 || page === queryParams.page) return;
    
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
    
    // Smooth scroll to top of content
    requestAnimationFrame(() => {
      const targetElement = document.getElementById("main-content") || 
                           document.getElementById("notices-list") ||
                           document.querySelector("main");
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: "smooth", 
          block: "start",
          inline: "nearest"
        });
      }
    });
  }, [queryParams.page, searchParams, setSearchParams]);


  const handleClearFilters = useCallback(() => {
    const newParams = new URLSearchParams();
    const pageSize = searchParams.get("pageSize");
    if (pageSize) {
      newParams.set("pageSize", pageSize);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const noticesData = useMemo(() => ({
    notices: noticesResponse?.result || [],
    totalCount: noticesResponse?.total || 0,
    currentPage: queryParams.page || 1,
    totalPages: noticesResponse?.totalPages || 0,
    pageSize: queryParams.limit || 10
  }), [noticesResponse, queryParams]);


  const hasActiveFilters = useMemo(() => {
    return Boolean(
      searchParams.get("search") || 
      searchParams.getAll("tag").length > 0 ||
      searchParams.get("sortBy") !== "date" ||
      searchParams.get("order") !== "desc"
    );
  }, [searchParams]);

  if (isError && !noticesResponse && !isFetching && !isRefetching) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Failed to load notices. Please try again.";

    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeading />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Failed to Load Notices
            </h2>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              {errorMessage}
            </p>
            <div className="flex gap-3">
              <Button onClick={handleRetry} disabled={isLoading || isFetching}>
                {(isLoading || isFetching) ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Try Again
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeading />
      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:flex-shrink-0">
            <NoticeFilter />
          </div>

          <div className="flex-1 min-w-0">
            <NoticesList
              notices={noticesData.notices}
              isLoading={isLoading}
              error={isError ? (error instanceof Error ? error.message : "An error occurred") : null}
              totalCount={noticesData.totalCount}
              currentPage={noticesData.currentPage}
              totalPages={noticesData.totalPages}
              pageSize={noticesData.pageSize}
              onRefresh={handleRefresh}
              isRefreshing={isRefetching}
              onPageChange={handlePageChange}
              onClearFilters={handleClearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </div>
      </main>
    </div>
  );
}