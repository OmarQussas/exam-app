// app/login/_components/LoginForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CiCircleRemove } from "react-icons/ci";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/login-schema";
import ShowPassword from "./show-password";
import type { FormData } from "@/lib/types/form-data";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  //Translation

  //Navigation

  //State

  const [error, setError] = useState<string>("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  //Ref

  //Context

  //Query

  //Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result?.error) throw new Error("Invalid credentials");
      return result;
    },
    onSuccess: () => {
      toast.success("Login Successful", { duration: 2000 });

      // Only allow internal callback URLs
      const params = new URLSearchParams(window.location.search);
      const callbackUrl = params.get("callbackUrl");

      // Prevent leaking to unrelated pages
      const safeUrl =
        callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/";

      window.location.href = safeUrl;
    },
    onError: (error: any) => {
      setError(error.message || "Something went wrong");
    },
  });

  // Hooks

  // Form & Validation
  const {
    register,
    handleSubmit,
    formState: { errors: rhfErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Variables

  // Functions
  const onSubmit = (data: FormData) => {
    setError("");
    mutate(data);
  };

  // Effects

  return (
    <form
      action="#"
      className="mt-6 w-3/4 lg:w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Email */}
      <label className="font-geistMono block text-gray-800" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        id="email"
        {...register("email")}
        placeholder="user@example"
        className={`border p-2 rounded pr-10 w-full ${
          rhfErrors.email ? "border-red-500" : ""
        }`}
        required
      />
      {/* Email Error */}
      {rhfErrors.email && (
        <p className="text-red-500 text-xs mt-1 w-full">
          {rhfErrors.email.message}
        </p>
      )}
      {/* Password */}
      <label
        className="font-geistMono text-gray-800 block mt-3"
        htmlFor="password"
      >
        Password
      </label>
      <ShowPassword
        register={register("password")}
        error={rhfErrors.password?.message}
        id="password"
      />

      {/* Forgot Password */}

      <Link
        className="text-right text-xs tracking-wide block ms-auto w-1/2 text-blue-500 mt-3"
        href={"/forgot-password"}
      >
        Forgot your password?
      </Link>

      {/* Error */}
      {error && (
        <p className="relative text-red-500 text-xs z-0 my-4 w-full border font-geistMono border-red-600 bg-red-50 text-center py-2">
          Invalid credentials
          <CiCircleRemove className="absolute bg-white rounded-full top-0 z-10 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600" />
        </p>
      )}

      {/* Login Button */}
      <Button
        type="submit"
        className="w-full px-2 rounded-none font-geistMono mt-2 bg-blue-600 text-white hover:bg-blue-700"
        disabled={isPending}
      >
        <span className="text-xs">{isPending ? "Logging in..." : "Login"}</span>
      </Button>

      {/* Register Button */}

      <div className="flex justify-center items-center gap-4 text-gray-500 mt-4">
        Don't have an account?
        <Link
          href="/register"
          onClick={() => setIsRedirecting(true)}
          className="text-blue-500"
        >
          {isRedirecting ? "Redirecting..." : "Create yours"}
        </Link>
      </div>
    </form>
  );
}
