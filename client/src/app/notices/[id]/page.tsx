import NoticeBody from "@/components/pages/notices/notice-body";
import NoticeDetailsSidebar from "@/components/pages/notices/notice-details-sidebar";
import useNoticeAction from "@/hooks/useNoticeAction.hook";
import { useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export default function NoticeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { useNoticeByIdQuery, useNoticeListQuery } = useNoticeAction();
  
  const noticeId = id ? parseInt(id, 10) : 0;
  
  const { 
    data: notice, 
    isLoading: isNoticeLoading, 
    error: noticeError 
  } = useNoticeByIdQuery(noticeId);
  
  // latest 3 notices excluding current one
  const { 
    data: relatedNoticesData, 
    isLoading: isRelatedLoading 
  } = useNoticeListQuery({
    page: 1,
    limit: 4, // Get 4 to potentially exclude current one
    sortBy: "date",
    order: "desc"
  });

  const relatedNotices = relatedNoticesData?.result?.filter(
    (relatedNotice) => relatedNotice.id !== noticeId
  ).slice(0, 3) || [];


  if (isNoticeLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="p-6">
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-2/3 mb-4" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="rounded-lg shadow-lg p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-10 w-full mb-3" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }


  if (noticeError || !notice ) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <FontAwesomeIcon
            icon={["fas", "exclamation-triangle"]}
            className="text-gray-400 text-6xl mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-700 mb-2">
            Notice Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            The notice you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/notices"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <FontAwesomeIcon icon={["fas", "arrow-left"]} className="mr-2" />
            Back to All Notices
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <NoticeBody notice={notice} />
        <NoticeDetailsSidebar 
          notice={notice}
          relatedNotices={relatedNotices} 
          isRelatedLoading={isRelatedLoading}
        />
      </div>
    </div>
  );
}