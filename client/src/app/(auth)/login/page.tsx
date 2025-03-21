import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginReq } from "@/lib/dtos/auth.dto";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidator } from "@/lib/validators/auth.validator";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import JWTService from "@/lib/services/cookies.service";
import { toast } from "sonner";

const Login = () => {
  const form = useForm<LoginReq>({ resolver: zodResolver(loginValidator) });
  const navigate = useNavigate();

  const onSubmit = async (data: LoginReq) => {
    console.log(data);
  };

  useEffect(() => {
    const tokenAvailable = JWTService.getJWT();
    if (tokenAvailable) {
      navigate("/dashboard");
      toast.info("You are already logged in.");
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full h-full grid lg:grid-cols-2">
        <div className="max-w-xs m-auto w-full flex flex-col items-center">
          <img className="h-24 w-24" src="./favicon.svg" />
          <p className="mt-4 text-xl font-bold tracking-tight text-center">
            Log in to IICT, SUST
          </p>

          <Form {...form}>
            <form
              className="w-full space-y-4"
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
                        checked={field.value} // Use `checked` instead of `value`
                        onCheckedChange={field.onChange} // Ensure correct event handling
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
              <Button type="submit" className="mt-4 w-full">
                Continue with Email
              </Button>
            </form>
          </Form>

          <div className="mt-5 space-y-5">
            <a
              href="/reset-password"
              className="text-sm block underline text-muted-foreground text-center"
            >
              Forgot your password?
            </a>
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
