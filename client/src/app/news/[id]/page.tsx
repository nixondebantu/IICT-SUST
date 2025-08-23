// src/app/news/[id]/page.tsx

import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import useNewsAction from "@/hooks/useNewsAction.hook";
import { AlertCircle, Calendar, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// A skeleton loader component for a better UX
const NewsDetailsSkeleton = () => (
  <div className="container mx-auto px-4 py-8 md:py-12">
    <Skeleton className="h-6 w-1/2 mb-8" />
    <article className="max-w-4xl mx-auto">
      <Skeleton className="h-12 w-3/4 mb-4" />
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-32" />
      </div>
      <Skeleton className="w-full h-80 rounded-lg mb-8" />
      <div className="space-y-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
        <Skeleton className="h-5 w-3/4" />
      </div>
    </article>
  </div>
);

export default function NewsDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { useNewsByIdQuery } = useNewsAction();

  // Fetch the specific news article. Ensure id is a valid number.
  const { data: newsArticle, isLoading, isError, error } = useNewsByIdQuery(Number(id));

  if (isLoading) {
    return <NewsDetailsSkeleton />;
  }

  if (isError || !newsArticle) {
    return (
      <div className="container mx-auto text-center py-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Failed to Load Article</h2>
        <p className="text-muted-foreground">
          {error?.message || "The news article you are looking for could not be found."}
        </p>
        <Link to="/news" className="mt-6 inline-block">
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded">
            Back to News
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumb className="mb-8 max-w-4xl mx-auto">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild to={""}><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild to={""}><Link to="/news">News</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage className="truncate max-w-xs md:max-w-md">{newsArticle.title}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Badge variant="secondary" className="mb-4">{newsArticle.tag.value}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{newsArticle.title}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground text-sm">
            {newsArticle.creator && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>By {newsArticle.creator.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Published on {new Date(newsArticle.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </header>

        <img
          src={newsArticle.image_url}
          alt={newsArticle.title}
          className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8"
        />

        {/* Render the HTML content from the rich text editor */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: newsArticle.content }}
        />
      </article>
    </div>
  );
}