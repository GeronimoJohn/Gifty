// Only add Global types here

interface Option {
  id: string;
  option: string;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export type Answers = {
  [questionId: number]: string;
};
