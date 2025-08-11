// src/hooks/useEventAction.hook.ts

import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData, // 1. Import keepPreviousData
} from "@tanstack/react-query";

import eventService from "@/lib/services/event.service";
import { QueryParams } from "@/lib/dtos/query.dto";
import { EventReq, EventRes } from "@/lib/dtos/event.dto";
import { toast } from "sonner";
import { ApiPaginatedResponse } from "@/lib/dtos/getData.dto";
import { queryKeys } from "@/lib/constants/query-keys";

export default function useEventAction() {
  const queryClient = useQueryClient();

  // Query to get a paginated list of events
  const useEventListQuery = (params: QueryParams) => {
    return useQuery<ApiPaginatedResponse<EventRes>, Error>({
      // 2. Add explicit types
      queryKey: [queryKeys.event.getAllEvents, params],
      queryFn: () => eventService.get(params),
      placeholderData: keepPreviousData, // 3. Use placeholderData instead of keepPreviousData
    });
  };

  // ... (rest of the file remains the same)
  // Query to get a single event by its ID
  const useEventByIdQuery = (id: number) => {
    return useQuery({
      queryKey: [queryKeys.event.getEventById, id],
      queryFn: () => eventService.getById(id),
      enabled: !!id, // Only run query if id is available
    });
  };

  // Mutation for creating a new event
  const useCreateEventMutation = () => {
    return useMutation({
      mutationFn: (data: EventReq) => eventService.create(data),
      onSuccess: () => {
        toast.success("Event created successfully!");
        queryClient.invalidateQueries({
          queryKey: [queryKeys.event.getAllEvents],
        });
      },
      onError: (error) => {
        toast.error("Failed to create event", {
          description: error.message,
        });
      },
    });
  };

  // Mutation for updating an event
  const useUpdateEventMutation = (id: number) => {
    return useMutation({
      mutationFn: (data: EventReq) => eventService.update(id, data),
      onSuccess: () => {
        toast.success("Event updated successfully!");
        queryClient.invalidateQueries({
          queryKey: [queryKeys.event.getAllEvents],
        });
        queryClient.invalidateQueries({
          queryKey: [queryKeys.event.getEventById, id],
        });
      },
      onError: (error) => {
        toast.error("Failed to update event", {
          description: error.message,
        });
      },
    });
  };

  // Mutation for deleting an event
  const useDeleteEventMutation = () => {
    return useMutation({
      mutationFn: (id: number) => eventService.delete(id),
      onSuccess: () => {
        toast.success("Event deleted successfully!");
        queryClient.invalidateQueries({
          queryKey: [queryKeys.event.getAllEvents],
        });
      },
      onError: (error) => {
        toast.error("Failed to delete event", {
          description: error.message,
        });
      },
    });
  };

  return {
    useEventListQuery,
    useEventByIdQuery,
    useCreateEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
  };
}
