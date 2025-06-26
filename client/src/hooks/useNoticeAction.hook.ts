import { queryKeys } from "@/lib/constants/query-keys";
import { NoticeReq } from "@/lib/dtos/notice.dto";
import { QueryParams } from "@/lib/dtos/query.dto";
import noticeService from "@/lib/services/notice.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useNoticeAction() {
  const queryClient = useQueryClient();
  const useNoticeListQuery = (params: QueryParams) =>
    useQuery({
      queryKey: [queryKeys.notice.getAllNotice],
      queryFn: () => noticeService.get(params),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    });

    const useNoticeByIdQuery = (id: number) =>
      useQuery({
        queryKey: [queryKeys.notice.getNoticeById, id],
        queryFn: () => noticeService.getById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
      });

  const useNoticeCreateMutation = useMutation({
    mutationFn: (data: NoticeReq) => noticeService.create(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.notice.getAllNotice],
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Can't create notice");
    },
  });

  return {
    useNoticeListQuery,
    useNoticeByIdQuery,
    useNoticeCreateMutation,
  };
}
