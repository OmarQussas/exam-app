"use client";
import { useState } from "react";
import Link from "next/link";
import { CiAlarmOn } from "react-icons/ci";

export default function ExamLink({ exam }: { exam: any }) {
  const [clicked, setClicked] = useState(false);

  return (
    // that's the exam rendered on the subjects page
    <Link
      href={`/exams/${exam._id}`}
      onClick={() => setClicked(true)}
      className="flex justify-between px-4 w-full"
    >
      <div>
        <p className="font-semibold">{exam.title}</p>
        <p className="text-sm text-gray-600">
          {exam.numberOfQuestions} questions
        </p>
      </div>

      {clicked ? (
        <div className="flex items-center gap-2 text-blue-600">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          Loading...
        </div>
      ) : (
        <p className="flex items-center gap-1 text-gray-400">
          <CiAlarmOn />
          Duration: {exam.duration} Minutes
        </p>
      )}
    </Link>
  );
}
