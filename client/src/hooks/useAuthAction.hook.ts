import authService from "@/lib/services/auth.service";
import JWTService from "@/lib/services/cookies.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useAuthAction() {
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      toast.error(error.response?.data.message || "Invalid credentials");
    },
    onSuccess: (data) => {
      toast.success(data.message);
      JWTService.setJWT(data.token, data.expireIn);
    },
  });

  return {
    loginMutation,
  };
}
