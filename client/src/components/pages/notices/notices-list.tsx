import NoticePagination from "./notice-pagination";
import NoticesCard from "./notices-card";

export default function NoticesList() {
  return (
    <div id="notices-list" className="flex-1">
      {/* results-header */}
      <div className="space-y-4">
        <p className="text-gray-600">Showing 1-10 of 127 notices</p>
        <NoticesCard />
        <NoticePagination />
      </div>
    </div>
  );
}
