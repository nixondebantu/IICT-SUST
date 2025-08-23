// src/hooks/useNewsAction.hook.ts

import { queryKeys } from "@/lib/constants/query-keys";
import { NewsReq } from "@/lib/dtos/news.dto";
import { QueryParams } from "@/lib/dtos/query.dto";
import newsService from "@/lib/services/news.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useNewsAction() {
  const queryClient = useQueryClient();

  const useNewsListQuery = (params: QueryParams) => {
    return useQuery({
      queryKey: [queryKeys.news.getAllNews, params],
      queryFn: () => newsService.get(params),
    });
  };

  const useNewsByIdQuery = (id: number) => {
    return useQuery({
      queryKey: [queryKeys.news.getNewsById, id],
      queryFn: () => newsService.getById(id),
      enabled: !!id,
    });
  };

  const useCreateNewsMutation = () => {
    return useMutation({
      mutationFn: (data: NewsReq) => newsService.create(data),
      onSuccess: () => {
        toast.success("News article created successfully!");
        queryClient.invalidateQueries({
          queryKey: [queryKeys.news.getAllNews],
        });
      },
      onError: (error) => {
        toast.error("Failed to create news", { description: error.message });
      },
    });
  };

  const useUpdateNewsMutation = (id: number) => {
    return useMutation({
      mutationFn: (data: Partial<NewsReq>) => newsService.update(id, data),
      onSuccess: () => {
        toast.success("News article updated successfully!");
        queryClient.invalidateQueries({
          queryKey: [queryKeys.news.getAllNews],
        });
        queryClient.invalidateQueries({
          queryKey: [queryKeys.news.getNewsById, id],
        });
      },
      onError: (error) => {
        toast.error("Failed to update news", { description: error.message });
      },
    });
  };

  const useDeleteNewsMutation = () => {
    return useMutation({
      mutationFn: (id: number) => newsService.delete(id),
      onSuccess: () => {
        toast.success("News article deleted successfully!");
        queryClient.invalidateQueries({
          queryKey: [queryKeys.news.getAllNews],
        });
      },
      onError: (error) => {
        toast.error("Failed to delete news", { description: error.message });
      },
    });
  };

  return {
    useNewsListQuery,
    useNewsByIdQuery,
    useCreateNewsMutation,
    useUpdateNewsMutation,
    useDeleteNewsMutation,
  };
}
