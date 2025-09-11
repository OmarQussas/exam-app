// app/forgot-password/_components/ForgotPasswordForm.tsx
"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { MdArrowRightAlt } from "react-icons/md";
import { forgotPassword } from "@/lib/api/auth-api/auth.api";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  //Translation

  //Navigation
  const router = useRouter();

  //State

  const [email, setEmail] = useState("");

  //Ref

  //Context

  //Query

  //Mutation

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data, variables) => {
      localStorage.setItem("email", variables.email);
      router.push(`/otp?email=${encodeURIComponent(email)}`);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      alert(error.message || "Something went wrong. Please try again.");
    },
  });

  // Hooks

  // Form & Validation

  // Variables

  // Functions

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate({ email });
  }

  // Effects

  return (
    <form onSubmit={handleSubmit} className="mt-6 w-3/4 lg:w-full">
      <label className="font-geistMono block text-gray-800" htmlFor="email">
        Email
      </label>

      <input
        type="email"
        id="email"
        placeholder="user@example.com"
        className="border p-[7px] text-sm ps-3 w-full"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded mt-8 w-full flex items-center justify-center gap-2 font-geistMono"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Submitting..." : "Continue"}
        <MdArrowRightAlt size={25} />
      </button>
    </form>
  );
}
