import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../lib/api/auth-api/auth.api";
import { User } from "../lib/types/user";
export const useRegister = () => {
  return useMutation<User, Error, User>({
    mutationFn: (user) => registerUser(user),
  });
};
