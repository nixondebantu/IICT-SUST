import NoticeFilter from "@/components/pages/notices/notice-filter";
import NoticesList from "@/components/pages/notices/notices-list";
import PageHeading from "@/components/pages/notices/page-heading";

export default function NoticePage() {
  return (
    <div>
      <PageHeading />
      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          <NoticeFilter />
          <NoticesList />
        </div>
      </main>
    </div>
  );
}
