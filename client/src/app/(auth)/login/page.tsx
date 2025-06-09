import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthAction from "@/hooks/useAuthAction.hook";
import { useAuth } from "@/lib/context/AuthContext";
import { LoginReq } from "@/lib/dtos/auth.dto";
import { loginValidator } from "@/lib/validators/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { setIsLoggedIn, isLoggedIn } = useAuth();
  const form = useForm<LoginReq>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });
  const navigate = useNavigate();
  const { loginMutation } = useAuthAction();

  const onSubmit = async (data: LoginReq) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        setIsLoggedIn(true);
        navigate("/dashboard");
      },
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
      toast.info("You are already logged in.");
    }
  }, []);

  console.log(form.formState.errors);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full h-full grid lg:grid-cols-2">
        <div className="max-w-xs m-auto w-full flex flex-col items-center">
          <img className="h-24 w-24" src="./favicon.svg" alt="IICT Logo" />{" "}
          {/* Added alt attribute for accessibility */}
          <p className="mt-4 text-xl font-bold tracking-tight text-center">
            Log in to IICT, SUST
          </p>
          <Form {...form}>
            <form
              className="w-full space-y-4" // space-y-4 applies to elements directly inside the form
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <Checkbox
                        id="remember"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending
                  ? "Logging in..."
                  : "Continue with Email"}
              </Button>
            </form>
          </Form>
          {/* New Button and existing link are now grouped in a div with vertical spacing */}
          <div className="mt-2 space-y-3 w-full">
            {" "}
            {/* Adjusted space-y to 3 for slightly tighter grouping, or keep 5 */}
            <Button
              type="button" // Important: ensures it doesn't submit the form
              className="w-full"
              variant="outline" // Use outline for a secondary button style
              onClick={() => navigate("/")} // Navigate to homepage
            >
              Go to Homepage
            </Button>
            <Link
              to="/reset-password"
              className="text-sm block underline text-muted-foreground text-center"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
        <div
          className="bg-muted hidden lg:block"
          style={{
            backgroundImage: "url('./images/IICT-login.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
};

export default Login;
