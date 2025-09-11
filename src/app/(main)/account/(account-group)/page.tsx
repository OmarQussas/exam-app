import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import type { User as SessionUser } from "../../../../lib/types/user";
import AccountSettingsButtons from "./_components/account-settings-buttons";

const page = async () => {
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
  const session = await getServerSession(authOptions);
  const user = session?.user as SessionUser | undefined;

  // Functions

  // Effects

  return (
    <main className="  mt-8 min-h-[calc(100vh-9rem)]   w-full p-6 min-w-[300px]  bg-white">
      <form action="#" className="mt-6 w-full">
        {/* First and Last Name */}
        <section className="flex items-start gap-4">
          <div className="w-full">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder={user?.firstName}
              className="border p-[7px] text-sm ps-3 w-full mb-2"
            />
          </div>

          <div className="w-full">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder={user?.lastName}
              className="border p-[7px] text-sm ps-3 w-full mb-2"
            />
          </div>
        </section>

        {/* Username */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder={user?.username}
          className="border p-[7px] text-sm ps-3 w-full mb-2"
        />

        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder={user?.email}
          className="border p-[7px] text-sm ps-3 w-full mb-2"
        />

        {/* phone */}

        <label htmlFor="phone">phone</label>
        <input
          type="phone"
          id="phone"
          name="phone"
          placeholder="+201012345678"
          className="border p-[7px] text-sm ps-3 w-full mb-2"
        />

        <AccountSettingsButtons />
      </form>
    </main>
  );
};

export default page;
