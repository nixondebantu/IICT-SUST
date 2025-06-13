import NoticeBody from "@/components/pages/notices/notice-body";
import NoticeDetailsSidebar from "@/components/pages/notices/notice-details-sidebar";
import { useParams } from "react-router";

export default function NoticeDetailsPage() {
  const { id } = useParams();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 container mx-auto px-4 py-8">
      <NoticeBody />
      <NoticeDetailsSidebar />
    </div>
  );
}
