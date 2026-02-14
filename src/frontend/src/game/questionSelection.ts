import { GameQuestion } from './gameTypes';
import { ROUND_LENGTH } from './gameTypes';

export function selectQuestionsForRound(
  availableQuestions: GameQuestion[],
  roundLength: number = ROUND_LENGTH
): GameQuestion[] {
  if (availableQuestions.length === 0) {
    return [];
  }

  const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);

  if (shuffled.length >= roundLength) {
    return shuffled.slice(0, roundLength);
  }

  // If we don't have enough unique questions, repeat some
  const selected: GameQuestion[] = [];
  while (selected.length < roundLength) {
    const remaining = roundLength - selected.length;
    const toAdd = shuffled.slice(0, Math.min(remaining, shuffled.length));
    selected.push(...toAdd);
  }

  return selected;
}
