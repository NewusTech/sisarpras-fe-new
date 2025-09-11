"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  displayItems?: boolean;
  displayPageSize?: boolean;
  onChange?: ({ page, limit }: { page: number; limit: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 0,
  totalItems = 0,
  itemsPerPage = 0,
  totalPages,
  displayItems,
  displayPageSize,
  onChange, // onChange prop to handle page and limit changes
}) => {
  const [localLimit, setLocalLimit] = useState(5);
  const router = useRouter();
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    if (currentPage > 3) pages.push("...");

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (onChange) {
      onChange({ page, limit: localLimit });
    } else {
      router.push(`?page=${page}&limit=${localLimit}`); // Use router.push if onChange is not provided
    }
  };

  const handleLimitChange = (newLimit: string) => {
    const limit = parseInt(newLimit, 10);
    if (onChange) {
      setLocalLimit(limit);
      onChange({ page: 1, limit });
    } else {
      router.push(`?page=1&limit=${limit}`);
    }
  };

  useEffect(() => {
    setLocalLimit(itemsPerPage);
  }, [itemsPerPage]);

  return (
    <div className="flex items-center justify-end gap-5 w-full my-6">
      {displayItems && (
        <React.Fragment>
          <div className="text-text-700 mr-auto">
            Menampilkan {Math.min(currentPage * itemsPerPage, totalItems)} data
            dari {totalItems} data
          </div>
          {displayPageSize && (
            <Select
              value={itemsPerPage?.toString() ?? "5"}
              onValueChange={handleLimitChange}
            >
              <SelectTrigger className="w-16 rounded-sm">
                <SelectValue placeholder={`${itemsPerPage}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          )}
        </React.Fragment>
      )}

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 flex items-center justify-center border border-primary text-primary disabled:opacity-50 rounded-md"
          aria-label="Previous page"
        >
          <span className="sr-only">Previous</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Button>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="w-9 h-9 flex items-center justify-center text-primary"
            >
              ...
            </span>
          ) : (
            <Button
              variant="ghost"
              key={`page-${page}`}
              onClick={() => handlePageChange(page as number)}
              className={`w-9 h-9 flex items-center justify-center rounded-md border border-primary ${
                currentPage === page
                  ? "bg-primary hover:bg-primary-800 text-white hover:text-white"
                  : "text-primary"
              }`}
            >
              {page}
            </Button>
          )
        )}

        <Button
          variant="ghost"
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-md border border-primary text-primary disabled:opacity-50"
          aria-label="Next page"
        >
          <span className="sr-only">Next</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
