import React, { ReactNode } from "react";
import { RiGraduationCapLine } from "react-icons/ri";

type DiplomasTitleProps = {
  icon: ReactNode;
  title: string;
};

const DiplomasTitle = ({ icon, title }: DiplomasTitleProps) => {
  return (
    // That's the main blue heading of the pages
    <section className="  bg-blue-600 text-white gap-4 p-4  text-3xl font-geistMono flex items-center justify-start w-full">
      {icon}
      <h1>{title}</h1>
    </section>
  );
};
export default DiplomasTitle;
