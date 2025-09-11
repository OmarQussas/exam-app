"use client";

import React, { useState, useEffect } from "react";
import DiplomasTitle from "./diplomas-title";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { CircularTimer } from "../exams/_components/circular-timer";
import { useParams } from "next/navigation";
import type { Question } from "@/lib/types/questions";
import Results from "../exams/_components/results";
import { useSubmitAnswers } from "../_hooks/useSubmitAnswers";

const ExamPageClient = () => {
  //Translation

  //Navigation

  //State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(90);
  const [timeUp, setTimeUp] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<any>(null);

  //Ref

  //Context

  //Query

  //Mutation

  // Hooks
  const { examId } = useParams();
  const { mutate: submitAnswers, isPending } = useSubmitAnswers();

  // Form & Validation

  // Variables
  const total = questions.length;
  const q = questions[current];

  const payload = {
    answers: Object.entries(selected).map(([questionId, correct]) => ({
      questionId,
      correct,
    })),
    time: 90 - timeLeft,
  };

  // Functions
  const handleNext = () => {
    if (current < total - 1) setCurrent((prev) => prev + 1);
  };

  const handleBack = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  const handleSubmit = () => {
    submitAnswers(payload, {
      onSuccess: (data) => {
        setResult(data);
        setShowResults(true);
      },
      onError: (error) => {
        console.error("Submission error:", error);
      },
    });
  };
  // Effects
  useEffect(() => {
    if (!examId) return;
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/questions/${examId}`);
        const data = await res.json();
        setQuestions(data.questions || []);
      } catch (err) {
        console.error("Failed to fetch questions", err);
      }
    };
    fetchQuestions();
  }, [examId]);

  useEffect(() => {
    if (timeUp) return;
    if (timeLeft <= 0) {
      setTimeUp(true);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setTimeUp(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, timeUp]);

  if (!questions.length) {
    return (
      <main className="p-4 font-geistMono">
        <p>Loading questions...</p>
      </main>
    );
  }

  return (
    <main className="p-4 font-geistMono ">
      {/* Header */}
      <div className="flex gap-2 mb-6">
        <Link
          href="/subjects"
          className="border border-blue-500 px-1 bg-white text-gray-600 flex items-center hover:bg-gray-50 transition"
        >
          <FiChevronLeft className="text-blue-500 text-2xl" />
        </Link>
        <DiplomasTitle
          title={"Exam Questions"}
          icon={<HiOutlineQuestionMarkCircle />}
        />
      </div>

      {/* Progress */}
      <section className="bg-white p-4 flex flex-col">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Frontend Development - CSS Quiz</span>
            <span>
              Question <span className="text-blue-500">{current + 1}</span> of{" "}
              {total}
            </span>
          </div>

          <div className="w-full bg-gray-200 h-3 rounded-none">
            <div
              className="bg-blue-500 h-3"
              style={{ width: `${((current + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Conditional Rendering Section */}
        {showResults && result ? (
          <Results result={result} />
        ) : (
          <div className="p-4 mb-6">
            <h2 className="font-semibold mb-4 text-blue-500 text-2xl">
              {q.question}
            </h2>
            <ul className="space-y-2">
              {q.answers.map((a) => (
                <li key={a.key}>
                  <label className="flex bg-gray-100 p-4 hover:bg-gray-200 items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={q._id}
                      value={a.key}
                      checked={selected[q._id] === a.key}
                      onChange={() =>
                        setSelected((prev) => ({ ...prev, [q._id]: a.key }))
                      }
                      className="accent-blue-600"
                    />
                    <span>{a.answer}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex items-center justify-between gap-4 mt-6">
          {/* Buttons rendered after the user answers all questions */}
          {showResults && result ? (
            <>
              {/* Restart Button */}
              <Button
                variant="outline"
                onClick={() => {
                  setShowResults(false);
                  setResult(null);
                  setSelected({});
                  setCurrent(0);
                  setTimeLeft(90);
                  setTimeUp(false);
                  setTimerKey((prev) => prev + 1);
                }}
                className="flex-1"
              >
                Restart Exam
              </Button>

              {/* Explore Subjects */}
              <Link href="/subjects" className="flex-1">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Explore Subjects
                </Button>
              </Link>
            </>
          ) : (
            // Buttons rendered while the user is on the middle of the exam

            // back button
            <>
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={current === 0}
                className="flex-1"
              >
                Back
              </Button>
              {/*circular timer   */}
              <CircularTimer
                key={timerKey}
                duration={90}
                onTimeUp={() => setTimeUp(true)}
              />
              {/*Next question button  */}
              <Button
                onClick={current === total - 1 ? handleSubmit : handleNext}
                disabled={
                  isPending || (current !== total - 1 && !selected[q._id])
                }
                className="flex-1 bg-blue-500 hover:bg-blue-600 flex items-center justify-center"
              >
                {isPending ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                ) : current === total - 1 ? (
                  "Submit Answers"
                ) : (
                  "Next Question"
                )}
              </Button>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default ExamPageClient;
