import OTPForm from "../_components/otp-form";

export default function OTPPage() {
  return (
    <main className="flex flex-col items-center md:items-start mx-auto w-full p-6 min-w-[300px] mt-60 ps-6">
      <h1 className="text-gray-800 font-inter text-2xl font-bold">
        Verify OTP
      </h1>

      <OTPForm />
    </main>
  );
}
