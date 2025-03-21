import Sidebar from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import JWTService from "@/lib/services/cookies.service";
import { LogOut, Menu } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    JWTService.removeJWT();
    toast.success("Logout Sucessfully");
    navigate("/");
  };
  return (
    <div>
      <nav className="flex px-4 justify-between h-14 border-b-2 items-center">
        <div className="flex gap-2">
          <Menu className="my-auto cursor-pointer hover:bg-primary/10 md:hidden block" />
          <Link to="/" className="text-2xl font-bold">
            IICT
          </Link>
        </div>
        <Button
          className="flex gap-2 hover:cursor-pointer"
          variant={"destructive"}
          onClick={handleLogOut}
        >
          <LogOut />
          Logout
        </Button>
      </nav>
      <div className="flex">
        <Sidebar className="hidden md:block" />
        <Outlet />
      </div>
    </div>
  );
}
