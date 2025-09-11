import Sidebar from "@/components/ui/sidebar";
import { ReactNode } from "react";
import DiplomasTitle from "./_components/diplomas-title";

export const metadata = {
  title: "Exam App",
  description: "First Elevate Project",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 text-white">
        <Sidebar />
      </aside>

      {/* Main content */}
      <section className="flex-1  ">
        <p className="text-gray-600 py-2 ps-1 font-geistMono font-semibold tracking-wide">
          Home
        </p>
        {children}
      </section>
    </main>
  );
}
