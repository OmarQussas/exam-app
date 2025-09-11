import React from "react";

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

//reusable component for login Layout UI

type authProps = { icon: React.ReactNode; title: string; description: string };
const AuthItem = (props: authProps) => {
  return (
    // Items found on the left side of the login form
    <main className="mt-5">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <span className="text-blue-600 border-blue-600 border p-1">
          {props.icon}
        </span>
        {/* Title */}
        <h1 className="text-[#155DFC] font-geistMono font-semibold tracking-wide">
          {props.title}
        </h1>
      </div>
      {/* Description */}
      <p className="text-[#374151] mt-1 ms-10 w-full hidden lg:block lg:w-2/3 text-sm  font-geistMono">
        {props.description}
      </p>
    </main>
  );
};

export default AuthItem;
