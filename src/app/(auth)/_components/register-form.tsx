"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PhoneInput } from "./phone-input";
import "react-international-phone/style.css";
import { registerSchema, RegisterSchema } from "@/schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ShowPassword from "./show-password";
import { Controller, useForm } from "react-hook-form";
import { useRegister } from "@/hooks/use-register";
import { CiCircleRemove } from "react-icons/ci";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  //Translation

  //Navigation
  const router = useRouter();

  //State

  //Ref

  //Context

  //Query

  //Mutation

  // Hooks
  const { mutate: registerMutate, isPending, isError } = useRegister();

  // Form & Validation
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Variables

  // Functions
  function onSubmit(data: RegisterSchema) {
    registerMutate(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        phone: data.phone.replace(/^\+?20/, "0"), // because the backend didn't handle the user that sends +20 before number
        email: data.email,
        password: data.password,
        rePassword: data.confirmPassword,
      },
      {
        onSuccess: () => {
          toast.success(
            "Account created successfully! Redirecting to login...",
            {
              duration: 2000,
            }
          );
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        },
        onError: (error) => {
          toast.error(
            error?.message || "Registration failed. Please try again."
          );
        },
      }
    );
  }

  // Effects

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 w-full">
      {/* First and Last Name */}
      <section className="flex items-start gap-4">
        <div className="w-full">
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            {...register("firstName")}
            placeholder="Ahmed"
            className="border p-[7px] text-sm ps-3 w-full mb-2"
            required
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div className="w-full">
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            {...register("lastName")}
            placeholder="Abdullah"
            className="border p-[7px] text-sm ps-3 w-full mb-2"
            required
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </section>

      {/* Username */}
      <label htmlFor="userName">Username</label>
      <input
        type="text"
        id="userName"
        {...register("username")}
        placeholder="user123"
        className="border p-[7px] text-sm ps-3 w-full mb-2"
        required
      />
      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username.message}</p>
      )}

      {/* Email */}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        {...register("email")}
        placeholder="user@example"
        className="border p-[7px] text-sm ps-3 w-full mb-2"
        required
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      {/* Phone */}
      <label htmlFor="phone">Phone</label>
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <PhoneInput
            {...field}
            value={field.value || ""}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone.message}</p>
      )}

      {/* Password */}
      <label htmlFor="password">Password</label>
      <ShowPassword
        register={register("password")}
        error={errors.password?.message}
        id="password"
      />

      {/* Confirm Password */}
      <label htmlFor="rePassword">Confirm Password</label>
      <ShowPassword
        register={register("confirmPassword")}
        error={errors.confirmPassword?.message}
        id="rePassword"
      />

      {/* Confirm password error */}
      {isError && (
        <p className="relative text-red-500 text-xs z-0 my-4 w-full border font-geistMono border-red-600 bg-red-50 text-center py-2">
          Something went wrong
          <CiCircleRemove className="absolute bg-white rounded-full top-0 z-10 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600" />
        </p>
      )}

      <Button
        type="submit"
        disabled={Object.keys(errors).length > 0 || isPending}
        className="w-full px-2 rounded-none font-geistMono mt-4 bg-blue-600 text-white hover:bg-blue-700"
      >
        <span className="text-xs">
          {isPending ? "Signing up..." : "Sign Up"}
        </span>
      </Button>
      {/* Navigation to login */}
      <div className="flex justify-center items-center gap-4 text-gray-500 mt-4">
        Already have an account?
        <Link className="text-blue-500" href={"/login"}>
          Login
        </Link>
      </div>
    </form>
  );
}
