// src/app/(protected)/dashboard/news/[id]/page.tsx

import NewsForm from "@/components/forms/NewsForm";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import useNewsAction from "@/hooks/useNewsAction.hook";
import { NewsReq } from "@/lib/dtos/news.dto";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditNewsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { useNewsByIdQuery, useUpdateNewsMutation } = useNewsAction();

  const { data: newsData, isLoading } = useNewsByIdQuery(Number(id));
  const { mutate: updateNews, isPending } = useUpdateNewsMutation(Number(id));

  const handleEditNews = (data: NewsReq) => {
    if (!id) return;
    updateNews(data, {
      onSuccess: () => navigate("/dashboard/news"),
    });
  };

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6 gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild to={""}><Link to="/dashboard">Dashboard</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild to={""}><Link to="/dashboard/news">News</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage><Badge className="shadow-none rounded-sm">Edit: {id}</Badge></BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-4">
        <h1 className="text-2xl font-semibold">Edit News Article</h1>
        <p className="text-muted-foreground">Update the details for this article.</p>
      </div>
      {isLoading ? (<p>Loading...</p>) : (
        <NewsForm onSubmit={handleEditNews} initialValues={newsData} isLoading={isPending} />
      )}
    </main>
  );
}