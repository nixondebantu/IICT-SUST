// src/components/pages/news/news-card.tsx

import { NewsRes } from "@/lib/dtos/news.dto";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface NewsCardProps {
  article: NewsRes;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow bg-white">
      <div className="md:flex">
        <div className="md:w-80 md:flex-shrink-0">
          <img
            className="w-full h-48 md:h-full object-cover"
            src={article.image_url}
            alt={article.title}
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
              {article.tag.value}
            </span>
            <span className="text-sm text-muted-foreground">
              {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <Link to={`/news/${article.id}`}>
            <h3 className="text-xl font-semibold text-primary/90 mb-3 hover:text-primary cursor-pointer">
              {article.title}
            </h3>
          </Link>
          <p 
            className="text-muted-foreground mb-4 line-clamp-3 flex-grow"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <Link
            to={`/news/${article.id}`}
            className="text-primary font-medium hover:underline cursor-pointer flex items-center mt-auto"
          >
            Read More
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}