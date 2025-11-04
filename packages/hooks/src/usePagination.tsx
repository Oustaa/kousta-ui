import { useCallback, useState } from "react";

type usePaginationProps = {
  total: number;
  page?: number;
  limit?: number;
};

export const usePagination = ({
  total,
  limit = 10,
  page = 1,
}: usePaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(page);
  const totalPages = Math.ceil(total / limit);

  const nextPage = useCallback(() => {
    if (currentPage === totalPages) return;
    setCurrentPage((prev) => prev + 1);
  }, [currentPage]);

  const prevPage = useCallback(() => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  }, [currentPage]);

  const setPage = useCallback((page: number) => {
    if (page > totalPages || page < 1) return;
    setCurrentPage(page);
  }, []);

  return {
    limit,
    page: currentPage,
    nextPage,
    prevPage,
    setPage,
  };
};
