import { queryKeys } from "@/lib/constants/query-keys";
import { QueryParams } from "@/lib/dtos/query.dto";
import { TagReq } from "@/lib/dtos/tag.dto";
import tagService from "@/lib/services/tag.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useTagsAction() {
  const queryClient = useQueryClient();
  const useTagsListQuery = (params: QueryParams) =>
    useQuery({
      queryKey: [queryKeys.tags.getAllTags, params.type],
      queryFn: () => tagService.get(params),
    });

  const useTagCreateMutation = useMutation({
    mutationFn: (data: TagReq) => tagService.create(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.tags.getAllTags, data.tag.type],
      });
    },
  });

  return {
    useTagsListQuery,
    useTagCreateMutation,
  };
}
