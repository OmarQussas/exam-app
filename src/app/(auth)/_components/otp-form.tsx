"use client";

import React, { useState, useRef, useEffect } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { verifyResetCode, forgotPassword } from "@/lib/api/auth-api/auth.api";
import Link from "next/link";

export default function OTPForm() {
  //Translation

  //Navigation
  const router = useRouter();

  //State
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  //Ref
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  //Context

  //Query

  //Mutation
  const resendMutation = useMutation({
    /*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Resends the OTP to the email stored in local storage.
     *
     * If local storage is not available (i.e. on the server), throws an
     * error. Otherwise, gets the email from local storage and calls
     * `forgotPassword` with it.
     *
     * @throws {Error} If local storage is not available
     * @throws {Error} If no email is found in local storage
     */
    /*******  f9687483-9e6c-4aa6-bf21-bcb362f2cdcb  *******/

    /**
     * Resends the OTP to the email stored in local storage.
     *
     * If local storage is not available (i.e. on the server), throws an
     * error. Otherwise, gets the email from local storage and calls
     * `forgotPassword` with it.
     *
     * @throws {Error} If local storage is not available
     * @throws {Error} If no email is found in local storage
     */
    mutationFn: () => {
      if (typeof window === "undefined") {
        throw new Error("LocalStorage is not available on the server");
      }

      const email = localStorage.getItem("email");
      if (!email) throw new Error("No email found");

      return forgotPassword({ email });
    },
    onSuccess: () => {
      toast.success("Code resent to your email!", { duration: 4000 });
      setTimer(30);
      setCanResend(false);
    },
    /*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Called when the mutation to resend the OTP fails.
     *
     * @param {Error} error The error that occurred
     */
    /*******  5468bcb2-30fd-4a29-9c25-e1b7a74eb371  *******/
    onError: (error: any) => {
      toast.error(error.message || "Failed to resend code", {
        duration: 4000,
      });
    },
  });

  const mutation = useMutation({
    mutationFn: (code: string) => verifyResetCode({ resetCode: code }),
    onSuccess: () => {
      toast.success("OTP verified!", { duration: 4000 });
      router.push("/reset-password");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to verify OTP", {
        duration: 4000,
      });
    },
  });

  // Hooks

  // Form & Validation

  // Variables

  // Functions
  const handleResend = () => {
    if (!canResend) return;
    resendMutation.mutate();
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("Text").trim().slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp((prev) => newOtp.concat(prev.slice(newOtp.length, 6)));
    newOtp.forEach((_, i) => inputsRef.current[i]?.focus());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.includes("")) {
      toast.error("Please enter the complete OTP", { duration: 4000 });
      return;
    }

    mutation.mutate(otp.join(""));
  };

  // Effects

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEmail(localStorage.getItem("email"));
    }
  }, []);

  return (
    <>
      {/* show email address that's been entered */}
      {email ? (
        <p className="text-gray-500 font-geistMono mt-2">
          Enter the 6-digit code we sent to {email}
          <Link href="/forgot-password" className="text-blue-600 px-4">
            Edit
          </Link>
        </p>
      ) : (
        <p className="text-gray-500 font-geistMono mt-2">
          Enter the 6-digit code we sent to your email
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 w-3/4 lg:w-full">
        {/* OTP Form Input */}
        <div className="flex gap-2 justify-between w-full max-w-xs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-lg border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onPaste={handlePaste}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
            />
          ))}
        </div>
        {/* OTP Form Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded mt-8 w-full flex items-center justify-center gap-2 font-geistMono"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Verifying..." : "Verify OTP"}
          <MdArrowRightAlt size={25} />
        </button>
      </form>
      {/* Resend code button */}
      <div className="mt-4 text-center text-gray-600">
        Didn’t receive the code?{" "}
        <button
          type="button"
          className={`text-blue-600 underline ml-1 ${
            !canResend ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleResend}
          disabled={!canResend}
        >
          {canResend ? "Resend Code" : `Resend in ${timer}s`}
        </button>
      </div>
    </>
  );
}
