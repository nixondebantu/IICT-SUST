import NoticeForm from "@/components/forms/NoticeForm";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useNoticeAction from "@/hooks/useNoticeAction.hook";
import { NoticeReq } from "@/lib/dtos/notice.dto";
import { Link, useNavigate, useParams } from "react-router";

export default function EditNoticePage() {
  const params = useParams();
  const navigate = useNavigate();

  const { useNoticeByIdQuery, useNoticeUpdateMutation } = useNoticeAction();
  const { data: noticeData, isLoading } = useNoticeByIdQuery(Number(params.id));
  const { mutate: updateNotice, isPending } = useNoticeUpdateMutation;

  const handleEditNotice = (data: NoticeReq) => {
    if (!params.id) return;
    updateNotice(
      { id: Number(params.id), data },
      {
        onSuccess: () => {
          navigate("/dashboard/notices");
        },
      }
    );
  };
  return (
    <main className="flex flex-1 flex-col p-4 md:p-6 gap-4">
      <div className="flex items-center justify-between">
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
                <Badge className="shadow-none rounded-sm">{params.id}</Badge>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <NoticeForm
        onSubmit={handleEditNotice}
        initialValues={noticeData}
        isLoading={isLoading || isPending}
      />
    </main>
  );
}
