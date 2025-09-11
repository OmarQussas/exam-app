"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ShowPassword from "@/app/(auth)/_components/show-password";
import toast from "react-hot-toast";
import { changePassword } from "@/lib/actions/change-passowrd.action";

export default function ChangePasswordForm() {
  //Translation

  //Navigation

  //State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //Ref

  //Context

  //Query

  //Mutation

  // Hooks

  // Form & Validation

  // Variables

  // Functions
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const result = await changePassword({
        oldPassword,
        password: newPassword,
        rePassword: confirmPassword,
      });

      if (result?.success === false) {
        throw new Error(result.message || "Failed to change password");
      }

      setSuccess("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("Password change error:", err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Effects

  return (
    <main className="mt-8 min-h-[calc(100vh-9rem)] w-full p-6 min-w-[300px] bg-white">
      <h1 className="text-gray-800 font-inter text-2xl font-bold">
        Change Password
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-4 w-3/4 lg:w-full"
      >
        <div>
          {/* Current Password */}
          <label
            htmlFor="oldPassword"
            className="block font-geistMono text-gray-800"
          >
            Current Password
          </label>
          <ShowPassword
            id="oldPassword"
            placeholder="Enter your current password"
            register={{
              name: "oldPassword",
              onChange: (e) => setOldPassword(e.target.value),
              value: oldPassword,
            }}
          />
        </div>

        <div>
          {/* New Password */}
          <label
            htmlFor="newPassword"
            className="block font-geistMono text-gray-800"
          >
            New Password
          </label>
          <ShowPassword
            id="newPassword"
            placeholder="Enter your new password"
            register={{
              name: "newPassword",
              onChange: (e) => setNewPassword(e.target.value),
              value: newPassword,
            }}
          />
        </div>

        <div>
          {/* Confirm Password */}
          <label
            htmlFor="confirmPassword"
            className="block font-geistMono text-gray-800"
          >
            Confirm Password
          </label>
          <ShowPassword
            id="confirmPassword"
            placeholder="Confirm your new password"
            register={{
              name: "confirmPassword",
              onChange: (e) => setConfirmPassword(e.target.value),
              value: confirmPassword,
            }}
          />
        </div>

        {/* Error and Success Messages */}

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full px-2 rounded-none font-geistMono mt-2 bg-blue-600 text-white hover:bg-blue-700"
        >
          <span className="text-xs">
            {loading ? "Changing..." : "Change Password"}
          </span>
        </Button>
      </form>
    </main>
  );
}
