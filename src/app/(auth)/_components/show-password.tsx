import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import type { UseFormRegisterReturn } from "react-hook-form";

interface ShowPasswordProps {
  id: string;
  placeholder?: string;
  error?: string;
  register?: {
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

const ShowPassword = ({
  register,
  error,
  placeholder = "Password",
  id,
}: ShowPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={`border p-2 rounded pr-10 w-full ${
            error ? "border-red-500" : ""
          }`}
          {...register}
          id={id}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
          tabIndex={-1}
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
};

export default ShowPassword;
