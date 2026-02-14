import { Category } from '../backend';
import { GameQuestion } from './gameTypes';

// Built-in question bank as fallback
export const QUESTION_BANK: Record<Category, GameQuestion[]> = {
  [Category.letters]: [
    {
      prompt: "What letter does 'Apple' start with?",
      correctAnswer: 'A',
      allAnswers: ['A', 'B', 'C', 'D'],
      category: Category.letters,
    },
    {
      prompt: "What letter does 'Ball' start with?",
      correctAnswer: 'B',
      allAnswers: ['A', 'B', 'C', 'D'],
      category: Category.letters,
    },
    {
      prompt: "What letter does 'Cat' start with?",
      correctAnswer: 'C',
      allAnswers: ['A', 'B', 'C', 'D'],
      category: Category.letters,
    },
    {
      prompt: "What letter does 'Dog' start with?",
      correctAnswer: 'D',
      allAnswers: ['A', 'B', 'C', 'D'],
      category: Category.letters,
    },
    {
      prompt: "What letter does 'Elephant' start with?",
      correctAnswer: 'E',
      allAnswers: ['E', 'F', 'G', 'H'],
      category: Category.letters,
    },
    {
      prompt: "What letter does 'Fish' start with?",
      correctAnswer: 'F',
      allAnswers: ['E', 'F', 'G', 'H'],
      category: Category.letters,
    },
    {
      prompt: "What letter does 'Giraffe' start with?",
      correctAnswer: 'G',
      allAnswers: ['E', 'F', 'G', 'H'],
      category: Category.letters,
    },
    {
      prompt: "What letter does 'House' start with?",
      correctAnswer: 'H',
      allAnswers: ['E', 'F', 'G', 'H'],
      category: Category.letters,
    },
    {
      prompt: "What letter does 'Ice cream' start with?",
      correctAnswer: 'I',
      allAnswers: ['I', 'J', 'K', 'L'],
      category: Category.letters,
    },
    {
      prompt: "What letter does 'Juice' start with?",
      correctAnswer: 'J',
      allAnswers: ['I', 'J', 'K', 'L'],
      category: Category.letters,
    },
    {
      prompt: "What letter does 'Kite' start with?",
      correctAnswer: 'K',
      allAnswers: ['I', 'J', 'K', 'L'],
      category: Category.letters,
    },
    {
      prompt: "What letter does 'Lion' start with?",
      correctAnswer: 'L',
      allAnswers: ['I', 'J', 'K', 'L'],
      category: Category.letters,
    },
  ],
  [Category.numbers]: [
    {
      prompt: 'How many fingers on one hand?',
      correctAnswer: '5',
      allAnswers: ['3', '4', '5', '6'],
      category: Category.numbers,
    },
    {
      prompt: 'What comes after 1?',
      correctAnswer: '2',
      allAnswers: ['1', '2', '3', '4'],
      category: Category.numbers,
    },
    {
      prompt: 'What comes after 2?',
      correctAnswer: '3',
      allAnswers: ['1', '2', '3', '4'],
      category: Category.numbers,
    },
    {
      prompt: 'What comes after 3?',
      correctAnswer: '4',
      allAnswers: ['2', '3', '4', '5'],
      category: Category.numbers,
    },
    {
      prompt: 'How many wheels on a car?',
      correctAnswer: '4',
      allAnswers: ['2', '3', '4', '5'],
      category: Category.numbers,
    },
    {
      prompt: 'What comes after 5?',
      correctAnswer: '6',
      allAnswers: ['4', '5', '6', '7'],
      category: Category.numbers,
    },
    {
      prompt: 'What comes after 6?',
      correctAnswer: '7',
      allAnswers: ['5', '6', '7', '8'],
      category: Category.numbers,
    },
    {
      prompt: 'What comes after 7?',
      correctAnswer: '8',
      allAnswers: ['6', '7', '8', '9'],
      category: Category.numbers,
    },
    {
      prompt: 'What comes after 8?',
      correctAnswer: '9',
      allAnswers: ['7', '8', '9', '10'],
      category: Category.numbers,
    },
    {
      prompt: 'What comes after 9?',
      correctAnswer: '10',
      allAnswers: ['8', '9', '10', '11'],
      category: Category.numbers,
    },
    {
      prompt: 'How many eyes do you have?',
      correctAnswer: '2',
      allAnswers: ['1', '2', '3', '4'],
      category: Category.numbers,
    },
    {
      prompt: 'How many legs does a dog have?',
      correctAnswer: '4',
      allAnswers: ['2', '3', '4', '5'],
      category: Category.numbers,
    },
  ],
  [Category.colors]: [
    {
      prompt: 'What color is the sun?',
      correctAnswer: 'Yellow',
      allAnswers: ['Red', 'Yellow', 'Blue', 'Green'],
      category: Category.colors,
    },
    {
      prompt: 'What color is the sky?',
      correctAnswer: 'Blue',
      allAnswers: ['Red', 'Yellow', 'Blue', 'Green'],
      category: Category.colors,
    },
    {
      prompt: 'What color is grass?',
      correctAnswer: 'Green',
      allAnswers: ['Red', 'Yellow', 'Blue', 'Green'],
      category: Category.colors,
    },
    {
      prompt: 'What color is a stop sign?',
      correctAnswer: 'Red',
      allAnswers: ['Red', 'Yellow', 'Blue', 'Green'],
      category: Category.colors,
    },
    {
      prompt: 'What color is an orange?',
      correctAnswer: 'Orange',
      allAnswers: ['Orange', 'Purple', 'Pink', 'Brown'],
      category: Category.colors,
    },
    {
      prompt: 'What color is a grape?',
      correctAnswer: 'Purple',
      allAnswers: ['Orange', 'Purple', 'Pink', 'Brown'],
      category: Category.colors,
    },
    {
      prompt: 'What color is snow?',
      correctAnswer: 'White',
      allAnswers: ['White', 'Black', 'Gray', 'Brown'],
      category: Category.colors,
    },
    {
      prompt: 'What color is coal?',
      correctAnswer: 'Black',
      allAnswers: ['White', 'Black', 'Gray', 'Brown'],
      category: Category.colors,
    },
    {
      prompt: 'What color do you get mixing red and blue?',
      correctAnswer: 'Purple',
      allAnswers: ['Orange', 'Purple', 'Green', 'Brown'],
      category: Category.colors,
    },
    {
      prompt: 'What color do you get mixing yellow and blue?',
      correctAnswer: 'Green',
      allAnswers: ['Orange', 'Purple', 'Green', 'Brown'],
      category: Category.colors,
    },
    {
      prompt: 'What color is a banana?',
      correctAnswer: 'Yellow',
      allAnswers: ['Red', 'Yellow', 'Blue', 'Green'],
      category: Category.colors,
    },
    {
      prompt: 'What color is chocolate?',
      correctAnswer: 'Brown',
      allAnswers: ['Orange', 'Purple', 'Pink', 'Brown'],
      category: Category.colors,
    },
  ],
};
