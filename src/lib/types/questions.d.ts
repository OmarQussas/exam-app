// types/questions.d.ts

export interface Answer {
  key: string; // e.g., "A1", "A2"
  answer: string; // answer text
}

export interface Exam {
  _id: string;
  title: string;
  duration: number; // in minutes
  subject: string | null; // subject ID
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
}

export interface Question {
  _id: string;
  question: string;
  answers: Answer[];
  type: "single_choice" | "multiple_choice" | string; // for extensibility
  correct: string; // key of correct answer
  subject: string | null;
  exam: Exam;
  createdAt: string;
}

export interface QuestionsResponse {
  message: string;
  questions: Question[];
}
