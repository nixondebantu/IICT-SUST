import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router";
import NoticeForm from "@/components/forms/NoticeForm";
import { NoticeReq } from "@/lib/dtos/notice.dto";
import useNoticeAction from "@/hooks/useNoticeAction.hook";

export default function CreateNoticePage() {
  const navigate = useNavigate();
  const { useNoticeCreateMutation } = useNoticeAction();
  const { mutate: createNotice, isPending } = useNoticeCreateMutation;
  const handleSubmit = (data: NoticeReq) => {
    createNotice(data, {
      onSuccess: () => {
        navigate("/dashboard/notices");
      },
    });
  };
  return (
    <div className="flex flex-col p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild to={""}>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild to={""}>
              <Link to="/dashboard/notices">Notices</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Badge className="shadow-none rounded-sm">Create New</Badge>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1>Create Notice</h1>
      <p>Use the form below to create a new notice.</p>
      <NoticeForm onSubmit={handleSubmit} isLoading={isPending} />
    </div>
  );
}
