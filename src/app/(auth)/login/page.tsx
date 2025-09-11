import LoginForm from "../_components/login-form";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center md:items-start mx-auto w-full p-6 min-w-[300px] mt-60 ps-6">
      <h1 className="text-gray-800 font-inter text-2xl font-bold">Login</h1>
      <LoginForm />
    </main>
  );
}
