import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function ResetPass() {
  const onClick = () => {
    toast.success("Password reset email sent!");
  };

  return (
    <div>
      <Button onClick={onClick}>Reset Password</Button>
      <p>
        Remember your password?{" "}
        <Link to="/login" className="underline">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default ResetPass;
