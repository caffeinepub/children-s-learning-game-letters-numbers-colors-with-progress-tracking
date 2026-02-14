import { Category } from '../backend';

export const ROUND_LENGTH = 10;
export const MIN_ANSWERS = 3;
export const MAX_ANSWERS = 4;

export interface GameQuestion {
  prompt: string;
  correctAnswer: string;
  allAnswers: string[];
  category: Category;
}

export type FeedbackState = 'none' | 'correct' | 'incorrect';
