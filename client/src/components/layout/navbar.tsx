import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/context/AuthContext";
import JWTService from "@/lib/services/cookies.service";
import { LayoutDashboard, LogIn, LogOut, Menu } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // On mount, check JWT
    const token = JWTService.getJWT();
    setIsLoggedIn(!!token);
  }, []);

  const hideNavbarPaths = ["/login", "/reset-password"];
  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }
  const handleLogOut = () => {
    JWTService.removeJWT();
    console.log("navigating to /");
    setIsLoggedIn(false);
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <nav className="flex px-4 justify-between h-14 border-b-2 items-center sticky top-0 bg-background">
      <div className="flex gap-2">
        <Menu className="my-auto cursor-pointer hover:bg-primary/10 md:hidden block" />
        <Link to="/" className="text-2xl font-bold">
          IICT
        </Link>
      </div>

      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarFallback className="bg-primary text-primary-foreground">
                SA
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 w-72">
            <DropdownMenuItem className="py-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  SA
                </AvatarFallback>
              </Avatar>
              <div className="ml-1 flex flex-col">
                <p className="text-sm font-medium">Super Admin</p>
                <p className="text-xs text-muted-foreground">
                  admin@example.com
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex-col items-start">
              <Link className="flex items-center gap-1 w-full" to="/dashboard">
                <LayoutDashboard className="h-4 w-4" />
                <span className="font-medium leading-none">Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-1 bg-destructive focus:cursor-pointer focus:bg-destructive/90 focus:text-white text-white"
              onClick={handleLogOut}
            >
              <LogOut className="h-4 w-4 text-white" />
              <span className="font-medium leading-none">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">
          <Button>
            <LogIn className="h-4 w-4" />
            Login
          </Button>
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
