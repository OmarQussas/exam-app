import React, { ReactNode } from "react";
import { AiFillFolder } from "react-icons/ai";
import AuthItem from "./_components/auth-item";
import { LuBrain } from "react-icons/lu";
import { LuBookOpen } from "react-icons/lu";
import { LuRectangleEllipsis } from "react-icons/lu";

import ExamApp from "@/components/ui/ExamApp";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className=" md:grid  md:grid-cols-2 gap-4 ">
        <section className="h-screen bg-[radial-gradient(100%_50%_at_75%_50%,_#D6EBFF_0%,_#EFF6FF_100%)]  hidden md:block  py-28 ps-16 pe-4   ">
          <ExamApp />
          <div className="mt-28">
            <h2 className="font-inter text-xl lg:text-2xl mb-12 text-gray-800  font-bold md:w-full lg:w-3/4 ">
              Empower your learning journey with our smart exam platform.
            </h2>

            <AuthItem
              icon={<LuBrain size={20} />}
              title="Tailored Diplomas"
              description="Choose from specialized tracks like Frontend, Backend, and Mobile Development."
            />
            <AuthItem
              icon={<LuBookOpen size={20} />}
              title="Focused Exams"
              description="Access topic-specific tests including HTML, CSS, JavaScript, and more."
            />
            <AuthItem
              icon={<LuRectangleEllipsis size={20} />}
              title="Smart Multi-Step Forms"
              description="Choose from specialized tracks like Frontend, Backend, and Mobile Development."
            />
          </div>
        </section>

        <section className="">{children}</section>
      </main>
    </>
  );
};

export default layout;
