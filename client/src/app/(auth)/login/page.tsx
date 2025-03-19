import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function Login() {
  const onClick = () => {
    toast("Login clicked");
  };
  return (
    <div>
      <Button onClick={onClick}>Login</Button>
      <p>
        Forgot your password?{" "}
        <a href="/reset-password" className="underline">
          Reset it
        </a>
      </p>
    </div>
  );
}

export default Login;
