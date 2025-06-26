import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";
import { useMemo, useCallback } from "react";

interface NoticePaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
}

export default function NoticePagination({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
}: NoticePaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const paginationItems = useMemo(() => {
    const items: (number | 'ellipsis')[] = [];
    const delta = 2; 

    if (totalPages <= 1) return items;

    items.push(1);

    // Add ellipsis if there's a gap between 1 and the start of current page range
    if (currentPage - delta > 2) {
      items.push('ellipsis');
    }

    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    for (let i = start; i <= end; i++) {
      if (!items.includes(i)) {
        items.push(i);
      }
    }

    if (currentPage + delta < totalPages - 1) {
      items.push('ellipsis');
    }

    if (totalPages > 1 && !items.includes(totalPages)) {
      items.push(totalPages);
    }

    return items;
  }, [currentPage, totalPages]);

  const handlePageChange = useCallback((page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;


    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);

    // Call optional callback - this will trigger the query refetch
    onPageChange?.(page);

    // Smooth scroll to top of notices with improved selector
    requestAnimationFrame(() => {
      const noticesContainer = document.getElementById("notices-container") || 
                              document.getElementById("notices-list") ||
                              document.getElementById("main-content");
      if (noticesContainer) {
        noticesContainer.scrollIntoView({ 
          behavior: "smooth", 
          block: "start",
          inline: "nearest"
        });
      }
    });
  }, [currentPage, totalPages, searchParams, setSearchParams, onPageChange]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  }, [currentPage, handlePageChange]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, handlePageChange]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, page: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePageChange(page);
    }
  }, [handlePageChange]);

  // Calculate display range
  const startItem = totalCount > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(currentPage * pageSize, totalCount);


  if (totalPages <= 1 || totalCount === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-4">

      <div className="text-center text-sm text-gray-600">
        Showing <span className="font-medium">{startItem}</span>-<span className="font-medium">{endItem}</span> of{' '}
        <span className="font-medium">{totalCount}</span> notice{totalCount !== 1 ? 's' : ''}
      </div>

      <div className="flex justify-center">
        <nav className="flex items-center space-x-2" aria-label="Pagination" role="navigation">

          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`
              px-3 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              ${currentPage === 1
                ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                : 'text-gray-500 hover:text-primary border-gray-300 hover:border-primary hover:bg-primary/5'
              }
            `}
            aria-label="Go to previous page"
            type="button"
          >
            <FontAwesomeIcon icon={["fas", "chevron-left"]} className="text-sm" />
          </button>

          {paginationItems.map((item, index) => {
            if (item === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-gray-400"
                  aria-hidden="true"
                >
                  ...
                </span>
              );
            }

            const isCurrentPage = item === currentPage;
            
            return (
              <button
                key={item}
                onClick={() => handlePageChange(item)}
                onKeyDown={(e) => handleKeyDown(e, item)}
                className={`
                  px-3 py-2 min-w-[40px] rounded-lg transition-all duration-200 font-medium
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  ${isCurrentPage
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-700 hover:text-primary border border-gray-300 hover:border-primary hover:bg-primary/5'
                  }
                `}
                aria-label={`Go to page ${item}`}
                aria-current={isCurrentPage ? 'page' : undefined}
                type="button"
              >
                {item}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`
              px-3 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              ${currentPage === totalPages
                ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                : 'text-gray-500 hover:text-primary border-gray-300 hover:border-primary hover:bg-primary/5'
              }
            `}
            aria-label="Go to next page"
            type="button"
          >
            <FontAwesomeIcon icon={["fas", "chevron-right"]} className="text-sm" />
          </button>
        </nav>
      </div>

    </div>
  );
}