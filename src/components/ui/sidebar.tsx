"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, GraduationCap, User } from "lucide-react";
import Logout from "@/components/features/auth/logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ExamApp from "./ExamApp";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-screen w-64 bg-[#eff6ff] text-zinc-900 font-geistMono">
      {/* Logo */}
      <div className="p-4 flex flex-col items-start justify-center gap-4 mt-8">
        <img
          src="/assets/images/elevate-logo.png"
          alt="Logo"
          className="w-3/4"
        />
        <ExamApp />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-4">
        <Link
          href="/subjects"
          className={`flex items-center space-x-3 p-2 transition ${
            pathname === "/subjects"
              ? "text-blue-700 border border-blue-600 bg-blue-100"
              : "text-blue-600 hover:border hover:border-blue-600 hover:bg-blue-100"
          }`}
        >
          <GraduationCap size={20} />
          <span>Diplomas</span>
        </Link>
        <Link
          href="/account"
          className={`flex items-center space-x-3 p-2 transition ${
            pathname === "/account"
              ? "text-blue-700 border border-blue-600 bg-blue-100"
              : "text-blue-600 hover:border hover:border-blue-600 hover:bg-blue-100"
          }`}
        >
          <User size={20} />
          <span>Account Settings</span>
        </Link>
      </nav>

      {/* User Info + Dropdown */}
      <div className="p-4 border-t border-zinc-200">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/Avatar.png"
              alt="User"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-medium">{session?.user?.name}</span>
              <span className="text-sm text-zinc-500">
                {session?.user?.email}
              </span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="inline-flex items-center rounded-md px-2 py-1"
                aria-label="Open account menu"
              >
                <ChevronRight size={18} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem asChild>
                <Link
                  href="/account"
                  className="flex items-center gap-2 w-full cursor-pointer"
                >
                  <User size={16} />
                  <span>Account</span>
                </Link>
              </DropdownMenuItem>
              {/* Logout function (client side) */}
              <DropdownMenuItem
                onClick={() => signOut()}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Logout />
                <span className="text-red-500">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
}
