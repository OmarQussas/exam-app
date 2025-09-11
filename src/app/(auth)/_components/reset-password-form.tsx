"use client";

import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { toast } from "react-hot-toast";
import { resetPasswordSchema } from "@/schemas/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ShowPassword from "./show-password";
import { resetPassword } from "../../../lib/api/auth-api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  //Translation

  //Navigation
  const router = useRouter();

  //State

  //Ref

  //Context

  //Query

  //Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (password: string) => resetPassword(password),
    onSuccess: () => {
      toast.success("Password reset successfully", { duration: 4000 });
      localStorage.removeItem("email"); // clear stored email
      router.push("/login"); // navigate to login page
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong", {
        duration: 4000,
      });
    },
  });

  // Hooks

  // Form & Validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Variables

  // Functions
  const onSubmit = (data: ResetPasswordFormData) => {
    mutate(data.password);
  };

  // Effects

  return (
    <main className="flex flex-col items-center md:items-start mx-auto w-full p-6 min-w-[300px] mt-60 ps-6">
      <h1 className="text-gray-800 font-inter text-2xl font-bold">
        Reset Password
      </h1>
      <p className="text-gray-500 font-geistMono mt-2">
        Enter your new password to recover your account.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 w-3/4 lg:w-full">
        {/* Password */}
        <label
          className="font-geistMono block text-gray-800 mt-4"
          htmlFor="password"
        >
          New Password
        </label>
        <ShowPassword
          id="password"
          placeholder="Enter new password"
          register={register("password")}
          error={errors.password?.message}
        />

        {/* Confirm Password */}
        <label
          className="font-geistMono block text-gray-800 mt-4"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <ShowPassword
          id="confirmPassword"
          placeholder="Confirm new password"
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        {/* Submit Button */}

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white py-2 px-4 rounded mt-8 w-full flex items-center justify-center gap-2 font-geistMono"
        >
          {isPending ? "Resetting..." : "Reset Password"}
          <MdArrowRightAlt size={25} />
        </button>
      </form>
    </main>
  );
};

export default ResetPasswordForm;
