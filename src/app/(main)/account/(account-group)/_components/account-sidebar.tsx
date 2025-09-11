"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Lock } from "lucide-react";
import Logout from "@/components/features/auth/logout";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();

  /**
   * Generates the class names for a sidebar link, given the
   * current pathname and the path to check against.
   *
   * @param {string} path - The path to check against the current
   *                        pathname.
   *
   * @returns {string} The class names for the sidebar link.
   */
  const linkClasses = (path: string) =>
    `flex items-center gap-3 px-4 py-2  transition ${
      pathname === path
        ? "text-blue-700 border border-blue-600 bg-blue-100"
        : "text-gray-700 hover:text-blue-600 hover:border hover:border-blue-600 hover:bg-blue-100"
    }`;

  return (
    <aside className="flex flex-col w-64 mx-8 mt-8 bg-white font-geistMono">
      {/* Navigation */}
      <nav className="flex-1 px-4 mt-4 space-y-3 ">
        <Link href="/account" className={linkClasses("/account")}>
          <User size={20} />
          <span>Profile</span>
        </Link>
        <Link
          href="/account/change-password"
          className={linkClasses("/account/change-password")}
        >
          <Lock size={20} />
          <span>Change Password</span>
        </Link>
      </nav>

      {/* Logout */}
      <div className="p-4 ">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center justify-center gap-2  bg-red-100 text-red-500   py-2 hover:bg-red-200 transition"
        >
          <Logout />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
