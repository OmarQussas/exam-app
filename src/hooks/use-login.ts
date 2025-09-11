import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../lib/api/auth-api/auth.api";
export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
  });
};
