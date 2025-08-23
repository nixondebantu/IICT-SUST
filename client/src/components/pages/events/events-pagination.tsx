// src/components/pages/events/events-pagination.tsx

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface EventsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function EventsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: EventsPaginationProps) {
  // Simple pagination logic (can be expanded)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      id="pagination"
      className="flex justify-center items-center space-x-2 mb-6"
    >
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {/* <FontAwesomeIcon icon={faChevronLeft} className="text-gray-500" /> */}
                <ChevronLeft className="h-4 w-4 text-gray-500" />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => onPageChange(page)}
          className="px-4 py-2"
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {/* <FontAwesomeIcon icon={faChevronRight} className="text-gray-500" /> */}
        <ChevronRight className="h-4 w-4 text-gray-500" />

      </Button>
    </div>
  );
}