import { useAuth } from "@/lib/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

const ProtectedLayout = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    toast.error("You are not logged in. Please log in to access this page.");
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
