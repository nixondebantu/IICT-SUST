// src/components/pages/news/news-list.tsx

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsRes } from "@/lib/dtos/news.dto";
import { Link } from "react-router-dom";

interface NewsListProps {
  news: NewsRes[];
  isLoading: boolean;
}

export default function NewsList({ news, isLoading }: NewsListProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {news.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold">No News Found</h2>
            <p className="text-gray-500 mt-2">There are no news articles matching your criteria.</p>
          </div>
        )}
        <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${isLoading ? 'opacity-50' : ''}`}>
          {news.map((article) => (
            <Card key={article.id} className="flex flex-col">
              <CardHeader>
                <img src={article.image_url} alt={article.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                <Badge variant="secondary" className="w-fit">{article.tag.value}</Badge>
                <CardTitle className="mt-2 line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3" dangerouslySetInnerHTML={{ __html: article.content }} />
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{new Date(article.date).toLocaleDateString()}</span>
                <Link to={`/news/${article.id}`}><Button>Read More</Button></Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}