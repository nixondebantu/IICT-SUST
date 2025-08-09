import NewsCard from "@/components/pages/news/news-card";
import NewsPageHeader from "@/components/pages/news/news-page-header";

export default function NewsPage() {
  return (
    <main className="space-y-4">
      <NewsPageHeader />
      <div id="news-grid" className="grid gap-6 mb-12 px-4">
        <NewsCard />
      </div>
    </main>
  );
}
