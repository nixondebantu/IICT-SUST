// src/app/news/[id]/page.tsx

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useNewsAction from "@/hooks/useNewsAction.hook";
import { AlertCircle, ArrowLeft, Calendar, Link as LinkIcon, Tag, User } from "lucide-react";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

// A detailed skeleton loader that matches the new design for a better UX
const NewsArticleSkeleton = () => (
  <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <article className="rounded-lg shadow-sm overflow-hidden p-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-8 w-4/5 mb-6" />
        <div className="flex flex-wrap items-center gap-6">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
      <Skeleton className="w-full h-80 rounded-lg mb-8" />
      <div className="space-y-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
      </div>
    </article>
  </main>
);

export default function NewsDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { useNewsByIdQuery, useNewsListQuery } = useNewsAction();

  // 1. Fetch the main article by its ID
  const { data: newsArticle, isLoading, isError, error } = useNewsByIdQuery(Number(id));

  // 2. Fetch the latest 4 articles to find related ones
  const { data: latestNewsResponse } = useNewsListQuery({
    page: 1,
    limit: 4, // Fetch a few extra in case the current article is in the list
    sortBy: "date",
    order: "desc",
  });

  // 3. Memoize the related articles list
  const relatedArticles = useMemo(() => {
    if (!latestNewsResponse?.result || !id) return [];
    // Filter out the current article and take the next 3
    return latestNewsResponse.result
      .filter(article => article.id !== Number(id))
      .slice(0, 3);
  }, [latestNewsResponse, id]);
  
  // 4. Handle social sharing and copy link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  if (isLoading) {
    return <NewsArticleSkeleton />;
  }

  if (isError || !newsArticle) {
    return (
      <div className="container mx-auto text-center py-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Article Not Found</h2>
        <p className="text-muted-foreground">{error?.message || "The article you are looking for could not be found."}</p>
        <Link to="/news" className="mt-6 inline-block"><Button>Back to News</Button></Link>
      </div>
    );
  }

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article id="news-article" className="rounded-lg shadow-sm overflow-hidden bg-white">
        <div className="p-6 md:p-8">
          <div id="article-header" className="mb-8">
            <h1 className="font-bold text-3xl md:text-4xl leading-tight mb-6">{newsArticle.title}</h1>
            <div id="article-meta" className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{new Date(newsArticle.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              {newsArticle.creator && (
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-primary" />
                  <span>By {newsArticle.creator.name}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-primary" />
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">{newsArticle.tag.value}</span>
              </div>
            </div>
          </div>

          <div id="featured-image" className="mb-8">
            <img className="w-full h-auto max-h-[500px] object-cover rounded-lg" src={newsArticle.image_url} alt={newsArticle.title} />
          </div>

          <div id="article-content" className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: newsArticle.content }} />

          <div id="social-sharing" className="border-t pt-6 mt-8">
            <h3 className="font-semibold text-lg mb-4">Share this article</h3>
            <div className="flex flex-wrap gap-2">
              {/* Add social sharing functionality here if needed */}
              <Button onClick={handleCopyLink} variant="outline"><LinkIcon className="mr-2 h-4 w-4"/>Copy Link</Button>
            </div>
          </div>
        </div>
      </article>

      <div id="navigation-links" className="mt-8 flex justify-between items-center">
        <Link to="/news">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All News
          </Button>
        </Link>
      </div>

      {relatedArticles.length > 0 && (
        <section id="related-articles" className="mt-12">
          <h2 className="font-bold text-2xl mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedArticles.map(article => (
              <Link to={`/news/${article.id}`} key={article.id}>
                <article className="rounded-lg shadow-sm overflow-hidden hover:shadow-md transition h-full flex flex-col">
                  <img className="w-full h-48 object-cover" src={article.image_url} alt={article.title} />
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary transition">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{new Date(article.date).toLocaleDateString()}</p>
                    <p className="text-gray-700 text-sm line-clamp-3 flex-grow" dangerouslySetInnerHTML={{ __html: article.content }} />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}