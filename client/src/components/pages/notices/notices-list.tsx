import { useEffect, useState, useCallback } from "react";
import NoticePagination from "./notice-pagination";
import NoticesCard from "./notices-card";
import { NoticeRes } from "@/lib/dtos/notice.dto";
import { Loader2, FileX, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface NoticesListProps {
  notices: NoticeRes[];
  isLoading?: boolean;
  error?: string | null;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  onPageChange?: (page: number) => void;
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
}

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters?: () => void;
  onRefresh?: () => void;
}

function EmptyState({ hasFilters, onClearFilters, onRefresh }: EmptyStateProps) {
  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4" role="status" aria-live="polite">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FileX className="w-8 h-8 text-gray-400" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No notices found
        </h3>
        <p className="text-gray-600 text-center mb-6 max-w-md">
          No notices match your current filters. Try adjusting your search criteria or clearing filters.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          {onClearFilters && (
            <Button variant="outline" onClick={onClearFilters}>
              Clear Filters
            </Button>
          )}
          {onRefresh && (
            <Button variant="default" onClick={onRefresh}>
              Refresh
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4" role="status" aria-live="polite">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <FileX className="w-8 h-8 text-gray-400" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No notices available
      </h3>
      <p className="text-gray-600 text-center mb-6">
        There are currently no notices to display. Check back later for updates.
      </p>
      {onRefresh && (
        <Button variant="default" onClick={onRefresh}>
          Refresh
        </Button>
      )}
    </div>
  );
}

function ErrorState({ error, onRefresh }: { error: string; onRefresh?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4" role="alert">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Failed to load notices
      </h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {error || "An error occurred while loading notices. Please try again."}
      </p>
      {onRefresh && (
        <Button variant="default" onClick={onRefresh}>
          Try Again
        </Button>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading notices">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="rounded-lg border p-6 bg-white"
        >
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            
            <div className="flex space-x-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>
        </div>
      ))}
      <span className="sr-only">Loading notices, please wait...</span>
    </div>
  );
}

export default function NoticesList({
  notices,
  isLoading = false,
  error = null,
  totalCount,
  currentPage,
  totalPages,
  pageSize,
  onRefresh,
  isRefreshing = false,
  onPageChange,
  onClearFilters,
  hasActiveFilters = false,
}: NoticesListProps) {
  const [displayedNotices, setDisplayedNotices] = useState<NoticeRes[]>([]);

  useEffect(() => {
    setDisplayedNotices(notices);
  }, [notices]);


  const startItem = totalCount > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  const handleRefresh = useCallback(() => {
    if (onRefresh && !isLoading && !isRefreshing) {
      onRefresh();
    }
  }, [onRefresh, isLoading, isRefreshing]);


  const handlePageChange = useCallback((page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  }, [onPageChange]);

  const handleClearFilters = useCallback(() => {
    if (onClearFilters) {
      onClearFilters();
    }
  }, [onClearFilters]);

  return (
    <div id="notices-list" className="flex-1">
      <div className="space-y-6">
        {!isLoading && !error && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <p className="text-gray-600">
                {totalCount > 0 ? (
                  <>
                    Showing <span className="font-medium">{startItem}</span>-<span className="font-medium">{endItem}</span> of{' '}
                    <span className="font-medium">{totalCount}</span> notice{totalCount !== 1 ? 's' : ''}
                  </>
                ) : (
                  'No notices found'
                )}
              </p>
              {hasActiveFilters && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Filtered
                </span>
              )}
            </div>
            
            {onRefresh && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading || isRefreshing}
                className="self-start sm:self-auto"
              >
                <Loader2 className={`w-4 h-4 mr-2 ${(isLoading || isRefreshing) ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            )}
          </div>
        )}

        {isLoading && <LoadingSkeleton />}

        {error && !isLoading && (
          <ErrorState error={error} onRefresh={handleRefresh} />
        )}

        {!isLoading && !error && displayedNotices.length === 0 && (
          <EmptyState
            hasFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
            onRefresh={handleRefresh}
          />
        )}

        {!isLoading && !error && displayedNotices.length > 0 && (
          <>
            <div className="space-y-4" id="notices-container">
              {displayedNotices.map((notice, index) => (
                <NoticesCard
                  key={`notice-${notice.id}-${currentPage}`}
                  notice={notice}
                  className="animate-in fade-in duration-500"
                />
              ))}
            </div>

            <NoticePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}