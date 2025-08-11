
// import { useMemo, useCallback, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import { toast } from "sonner";
// import { Loader2, AlertCircle } from "lucide-react";

// import EventTitleSection from "@/components/pages/events/event-title-section";
// import EventsList from "@/components/pages/events/events-list";
// import EventsPagination from "@/components/pages/events/events-pagination";
// import EventsSearchFilter from "@/components/pages/events/events-search-filter";
// import useEventAction from "@/hooks/useEventAction.hook";
// import { QueryParams } from "@/lib/dtos/query.dto";

// export default function EventsPage() {
//   // Corrected: Use the hook from react-router-dom which returns a state-like tuple
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { useEventListQuery } = useEventAction();

//   const queryParams: QueryParams = useMemo(() => {
//     return {
//       page: Number(searchParams.get("page") || "1"),
//       limit: Number(searchParams.get("limit") || "9"),
//       search: searchParams.get("search") || undefined,
//       tag: searchParams.get("tag") ? [Number(searchParams.get("tag"))] : undefined,
//       sortBy: searchParams.get("sortBy") || "start_time",
//       order: (searchParams.get("order") as "asc" | "desc") || "desc",
//     };
//   }, [searchParams]);

//   const {
//     data: eventsResponse,
//     isLoading,
//     isError,
//     error,
//     isFetching,
//   } = useEventListQuery(queryParams);

//   useEffect(() => {
//     if (isError) {
//       toast.error("Failed to load events", {
//         description: error instanceof Error ? error.message : "An unknown error occurred.",
//       });
//     }
//   }, [isError, error]);

//   // Corrected: Use setSearchParams to update the URL's query string
//   const handleQueryChange = useCallback(
//     (name: string, value: string) => {
//       setSearchParams(prev => {
//         const newParams = new URLSearchParams(prev);
//         if (value) {
//           newParams.set(name, value);
//         } else {
//           newParams.delete(name);
//         }

//         if (name !== 'page') {
//           newParams.set('page', '1');
//         }
//         return newParams;
//       });
//     },
//     [setSearchParams]
//   );

//   const eventsData = eventsResponse?.result || [];
//   const totalPages = eventsResponse?.totalPages || 1;
  
//   const isInitialLoading = isLoading && !eventsResponse;

//   return (
//     <div>
//       <EventTitleSection />
//       <EventsSearchFilter
//         queryParams={queryParams}
//         onQueryChange={handleQueryChange}
//       />

//       {isInitialLoading ? (
//         <div className="flex justify-center items-center py-20">
//           <Loader2 className="w-12 h-12 animate-spin text-primary" />
//           <p className="ml-4 text-lg">Loading Events...</p>
//         </div>
//       ) : isError && eventsData.length === 0 ? (
//         <div className="container mx-auto text-center py-20">
//           <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold">Failed to Load Events</h2>
//           <p className="text-gray-600">
//             {error instanceof Error ? error.message : "Please try refreshing the page."}
//           </p>
//         </div>
//       ) : (
//         <EventsList
//           events={eventsData}
//           isLoading={isFetching}
//           queryParams={queryParams}
//           onQueryChange={handleQueryChange}
//         />
//       )}

//       {totalPages > 1 && !isError && (
//         <EventsPagination
//           currentPage={queryParams.page || 1}
//           totalPages={totalPages}
//           onPageChange={(page) => handleQueryChange("page", page.toString())}
//         />
//       )}
//     </div>
//   );
// }
// src/app/events/page.tsx
// (Keep all your imports)
import { useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, AlertCircle } from "lucide-react";
import EventTitleSection from "@/components/pages/events/event-title-section";
import EventsList from "@/components/pages/events/events-list";
import EventsPagination from "@/components/pages/events/events-pagination";
import EventsSearchFilter from "@/components/pages/events/events-search-filter";
import useEventAction from "@/hooks/useEventAction.hook";
import { QueryParams } from "@/lib/dtos/query.dto";


export default function EventsPage() {
  console.log("1. Rendering EventsPage component...");

  const [searchParams, setSearchParams] = useSearchParams();
  console.log("2. useSearchParams hook finished.");

  const { useEventListQuery } = useEventAction();
  console.log("3. useEventAction hook finished.");

  const queryParams: QueryParams = useMemo(() => {
    console.log("4. Calculating queryParams...");
    const params = {
      page: Number(searchParams.get("page") || "1"),
      limit: Number(searchParams.get("limit") || "9"),
      search: searchParams.get("search") || undefined,
      tag: searchParams.get("tag") ? [Number(searchParams.get("tag"))] : undefined,
      sortBy: searchParams.get("sortBy") || "start_time",
      order: (searchParams.get("order") as "asc" | "desc") || "desc",
    };
    console.log("5. queryParams calculated:", params);
    return params;
  }, [searchParams]);

  const {
    data: eventsResponse,
    isLoading,
    isError,
    error,
    isFetching,
  } = useEventListQuery(queryParams);
  console.log("6. useEventListQuery hook finished. isLoading:", isLoading, "isError:", isError);

  // The rest of the component...
  useEffect(() => {
    if (isError) {
      toast.error("Failed to load events", {
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    }
  }, [isError, error]);
  
  const handleQueryChange = useCallback(
    (name: string, value: string) => {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        if (value) {
          newParams.set(name, value);
        } else {
          newParams.delete(name);
        }

        if (name !== 'page') {
          newParams.set('page', '1');
        }
        return newParams;
      });
    },
    [setSearchParams]
  );
  
  const eventsData = eventsResponse?.result || [];
  const totalPages = eventsResponse?.totalPages || 1;
  
  const isInitialLoading = isLoading && !eventsResponse;
  
  console.log("7. Preparing to render JSX...");

  return (
    <div>
      <EventTitleSection />
      <EventsSearchFilter
        queryParams={queryParams}
        onQueryChange={handleQueryChange}
      />
      {/* ... rest of your JSX */}
       {isInitialLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      ) : isError && eventsData.length === 0 ? (
        <div className="container mx-auto text-center py-20">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Failed to Load Events</h2>
        </div>
      ) : (
        <EventsList
          events={eventsData}
          isLoading={isFetching}
          queryParams={queryParams}
          onQueryChange={handleQueryChange}
        />
      )}
      {totalPages > 1 && !isError && (
        <EventsPagination
          currentPage={queryParams.page || 1}
          totalPages={totalPages}
          onPageChange={(page) => handleQueryChange("page", page.toString())}
        />
      )}
    </div>
  );
}