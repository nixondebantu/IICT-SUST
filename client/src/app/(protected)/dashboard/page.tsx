import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { dashboardOptions } from "@/lib/constants/dashboard-options";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col max-w-7xl p-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Badge className="shadow-none rounded-full">Dashboard</Badge>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-4 flex-wrap">
        {dashboardOptions.map((option) => (
          <Link
            key={option.label}
            className="border rounded-md flex justify-center items-center p-6 hover:cursor-pointer hover:bg-primary/10 transition-all duration-200 ease-in-out"
            to={option.href}
          >
            <option.Icon className="h-10 w-10 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">{option.label}</h2>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
