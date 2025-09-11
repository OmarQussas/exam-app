import { getExams } from "@/lib/api/exams-api/exams.api";
import type { Exam } from "@/lib/types/exams";
import { LuBookOpenCheck } from "react-icons/lu";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";

import DiplomasTitle from "../../_components/diplomas-title";
import ExamLink from "../_components/exam-link";

export default async function ExamsPage({
  params,
}: {
  params: { subjectId: string };
}) {
  const { subjectId } = params;

  const exams: Exam[] = await getExams(subjectId);

  return (
    <main className="p-4 marker:">
      <div className="flex gap-2 ">
        <Link
          href="/"
          className=" border border-blue-500  px-1 bg-white text-gray-600 flex items-center hover:bg-gray-50 transition"
        >
          <FiChevronLeft className="text-blue-500 text-2xl" />
        </Link>
        <DiplomasTitle title={"Exams"} icon={<LuBookOpenCheck />} />
      </div>
      {exams.length === 0 ? (
        <p>No exams found.</p>
      ) : (
        <ul className="space-y-2 mt-4">
          {exams.map((exam) => (
            <li
              key={exam._id}
              className="p-3 bg-blue-50 text-xl text-blue-600 font-geistMono shadow-sm"
            >
              {exams.map((exam) => (
                <ExamLink key={exam._id} exam={exam} />
              ))}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
