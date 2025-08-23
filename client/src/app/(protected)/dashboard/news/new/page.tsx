// src/app/(protected)/dashboard/news/new/page.tsx

import NewsForm from "@/components/forms/NewsForm";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import useNewsAction from "@/hooks/useNewsAction.hook";
import { NewsReq } from "@/lib/dtos/news.dto";
import { Link, useNavigate } from "react-router-dom";

export default function CreateNewsPage() {
  const navigate = useNavigate();
  const { useCreateNewsMutation } = useNewsAction();
  const { mutate: createNews, isPending } = useCreateNewsMutation();

  const handleSubmit = (data: NewsReq) => {
    createNews(data, {
      onSuccess: () => navigate("/dashboard/news"),
    });
  };

  return (
    <div className="flex flex-col p-4 md:p-6 gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild to={""}><Link to="/dashboard">Dashboard</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild to={""}><Link to="/dashboard/news">News</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage><Badge className="shadow-none rounded-sm">Create New</Badge></BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-4">
        <h1 className="text-2xl font-semibold">Create a New Article</h1>
        <p className="text-muted-foreground">Fill out the form to publish a new news article.</p>
      </div>
      <NewsForm onSubmit={handleSubmit} isLoading={isPending} />
    </div>
  );
}