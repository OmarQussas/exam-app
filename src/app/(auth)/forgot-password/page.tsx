// app/forgot-password/page.tsx (Server Component by default)
import ForgotPasswordForm from "../_components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <main className="flex flex-col items-center md:items-start mx-auto w-full p-6 min-w-[300px] mt-60 ps-6">
      <h1 className="text-gray-800 font-inter text-2xl font-bold">
        Forgot Password
      </h1>
      <p className="text-gray-500 font-geistMono mt-2">
        Don't worry we will help you recover your account.
      </p>

      <ForgotPasswordForm />
    </main>
  );
}
