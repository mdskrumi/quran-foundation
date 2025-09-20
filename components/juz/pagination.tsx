'use client';

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface PaginationMeta {
  per_page: number;
  current_page: number;
  next_page: number | null;
  total_pages: number;
  total_records: number;
}

export function PaginationControls({
  id,
  pagination,
  script,
  translations,
}: {
  id: number;
  pagination: PaginationMeta;
  script: string;
  translations?: string;
}) {
  return (
    <Pagination>
      <PaginationContent>
        {pagination.current_page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`/juz/${id}?page=${pagination.current_page - 1}&script=${script}`} />
          </PaginationItem>
        )}

        {Array.from({ length: pagination.total_pages }).map((_, i) => {
          const pageNum = i + 1;
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href={`/juz/${id}?page=${pageNum}&script=${script}${translations ? `&translations=${translations}` : ''}`}
                isActive={pageNum === pagination.current_page}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {pagination.current_page < pagination.total_pages && (
          <PaginationItem>
            <PaginationNext
              href={`/juz/${id}?page=${pagination.current_page + 1}&script=${script}${translations ? `&translations=${translations}` : ''}`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
