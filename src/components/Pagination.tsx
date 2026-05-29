"use client";
import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  pageNeighbours?: number;
  pageJump?: number;
  showItemsPerPage?: boolean;
  showPageInfo?: boolean;
  className?: string;
}

/**
 * Pagination component
 * A reusable, accessible pagination UI that matches the application's
 * design system (orange primary color, gray neutral tones, rounded-lg borders).
 *
 * @example
 * <Pagination
 *   currentPage={page}
 *   totalPages={Math.ceil(total / pageSize)}
 *   totalItems={total}
 *   itemsPerPage={pageSize}
 *   onPageChange={setPage}
 *   onItemsPerPageChange={setPageSize}
 *   pageNeighbours={2}
 *   pageJump={5}
 * />
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 20, 50, 100],
  pageNeighbours = 2,
  pageJump = 10,
  showItemsPerPage = true,
  showPageInfo = true,
  className = "",
}) => {
  if (totalPages <= 0 && !showItemsPerPage && !showPageInfo) return null;

  // Build the visible page numbers with ellipsis
  const getPageNumbers = (): (number | "...")[] => {
    const delta = pageNeighbours; // siblings on each side of current page
    const range: number[] = [];
    const rangeWithDots: (number | "...")[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l !== undefined) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  // Compute display range for "Showing X – Y of Z"
  const firstItem =
    totalItems === undefined ? null : (currentPage - 1) * itemsPerPage + 1;
  const lastItem =
    totalItems === undefined
      ? null
      : Math.min(currentPage * itemsPerPage, totalItems);

  const btnBase =
    "inline-flex items-center justify-center h-8 min-w-[2rem] px-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:opacity-40 disabled:cursor-not-allowed";
  const btnDefault = "border border-gray-200 text-gray-700 hover:bg-gray-50";
  const btnActive =
    "bg-orange-600 text-white border border-orange-600 font-medium shadow-sm";
  const btnNav =
    "border border-gray-200 text-gray-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200";

  return (
    <div
      className={`flex flex-col sm:flex-row items-end gap-3 py-3 px-4 bg-white rounded-lg justify-between ${className}`}
    >
      {/* Left: page info + items-per-page */}
      <div className="flex items-center gap-3 text-sm text-gray-600">
        {showPageInfo &&
          totalItems !== undefined &&
          firstItem !== null &&
          lastItem !== null && (
            <span>
              Showing{" "}
              <span className="font-medium text-gray-900">{firstItem}</span>
              {" – "}
              <span className="font-medium text-gray-900">{lastItem}</span>
              {" of "}
              <span className="font-medium text-gray-900">{totalItems}</span>
            </span>
          )}

        {showItemsPerPage && onItemsPerPageChange && (
          <div className="flex items-center gap-1.5">
            <label htmlFor="pagination-items-per-page" className="text-gray-500 whitespace-nowrap">
              Rows:
            </label>
            <select
              id="pagination-items-per-page"
              value={itemsPerPage}
              onChange={(e) => {
                onItemsPerPageChange(Number(e.target.value));
                onPageChange(1);
              }}
              className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white"
            >
              {itemsPerPageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right: pagination controls */}
      {totalPages >= 1 && (
        <nav aria-label="Pagination" className="flex items-center gap-1">
          {/* First page */}
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={`${btnBase} ${btnNav}`}
            title="First page"
            aria-label="First page"
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
          </button>

          {/* Previous page */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${btnBase} ${btnNav}`}
            title="Previous page"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Previous jump (5 pages) */}
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - pageJump))}
            disabled={currentPage === 1}
            className={`${btnBase} ${btnNav}`}
            title={`Previous ${pageJump} pages`}
            aria-label={`Previous ${pageJump} pages`}
          >
            Prev {pageJump}
          </button>

          {/* Page numbers */}
          {pageNumbers.map((page, idx) =>
            page === "..." ? (
              <span
                key={`ellipsis-${idx}-${currentPage}`}
                className="inline-flex items-center justify-center h-8 min-w-[2rem] text-sm text-gray-400 px-1"
              >
                …
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`${btnBase} ${
                  currentPage === page ? btnActive : btnDefault
                }`}
                aria-current={currentPage === page ? "page" : undefined}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            ),
          )}

          {/* Next page */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${btnBase} ${btnNav}`}
            title="Next page"
            aria-label="Next page"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Next jump (5 pages) */}
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + pageJump))}
            disabled={currentPage === totalPages}
            className={`${btnBase} ${btnNav}`}
            title={`Next ${pageJump} pages`}
            aria-label={`Next ${pageJump} pages`}
          >
            Next {pageJump}
          </button>

          {/* Last page */}
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`${btnBase} ${btnNav}`}
            title="Last page"
            aria-label="Last page"
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      )}
    </div>
  );
};

export default Pagination;
