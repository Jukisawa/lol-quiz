export interface Question {
  category: string;
  value: number;
  question: string;
  answer: string[];
  guessed: boolean;
  multipleChoice: boolean;
  hint: string[];
}