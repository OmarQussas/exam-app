export type Exam = {
  _id: string;
  title: string;
  duration: number; // in minutes
  subject: string; // subjectId reference
  numberOfQuestions: number;
  active: boolean;
  createdAt: string; // ISO date string
};
