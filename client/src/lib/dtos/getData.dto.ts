export type ApiPaginatedResponse<T> = {
  result: T[];
  total: number;
  totalPages: number;
  currentPage: number;
};
