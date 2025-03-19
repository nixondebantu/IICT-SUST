import { Button } from "@/components/ui/button";
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
        <a href="/login" className="underline">
          Log in
        </a>
      </p>
    </div>
  );
}

export default ResetPass;
