import RegisterForm from "../_components/register-form";

export default function RegisterPage() {
  return (
    <main className="flex flex-col items-center md:items-start mx-auto w-full p-6 min-w-[300px] mt-20 ps-6">
      <h1 className="text-gray-800 font-inter text-2xl font-bold">
        Create Account
      </h1>
      <RegisterForm />
    </main>
  );
}
