export interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  search?: string;
  tag?: number[];
  type?: string;
}
