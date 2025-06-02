export interface Question {
  category: string;
  value: number;
  question: string;
  answers: string[];
  guessed: boolean;
  multipleChoice: boolean;
  hints: string[];
}