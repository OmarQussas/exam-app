import React from "react";
import DiplomasTitle from "../_components/diplomas-title";
import { User } from "lucide-react";
import AccountSidebar from "./(account-group)/_components/account-sidebar";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    //Translation

    //Navigation

    //State

    //Ref

    //Context

    //Query

    //Mutation

    // Hooks

    // Form & Validation

    // Variables

    // Functions

    // Effects

    <div className=" ">
      <div className="flex gap-2 ms-8 ">
        <Link
          href="/"
          className=" border border-blue-500  px-1 bg-white text-gray-600 flex items-center hover:bg-gray-50 transition"
        >
          <FiChevronLeft className="text-blue-500 text-2xl" />
        </Link>
        <DiplomasTitle title="Account Settings" icon={<User />} />
      </div>

      <div className="flex  min-h-[calc(100vh-7rem)]  gap-2">
        <AccountSidebar />

        <main className="flex-1 mx-6 ">{children}</main>
      </div>
    </div>
  );
}
