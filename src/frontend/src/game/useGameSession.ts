import { useState, useCallback } from 'react';
import { GameQuestion, FeedbackState, ROUND_LENGTH } from './gameTypes';

export function useGameSession(questions: GameQuestion[]) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState>('none');
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswer = useCallback(
    (selectedAnswer: string) => {
      if (feedback !== 'none' || !currentQuestion) return;

      const isCorrect = currentQuestion.correctAnswer.toLowerCase() === selectedAnswer.toLowerCase();
      
      setFeedback(isCorrect ? 'correct' : 'incorrect');
      
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      // Auto-advance after feedback
      setTimeout(() => {
        if (currentQuestionIndex < totalQuestions - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          setFeedback('none');
        } else {
          setIsComplete(true);
        }
      }, 1500);
    },
    [currentQuestion, currentQuestionIndex, totalQuestions, feedback]
  );

  return {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    score,
    feedback,
    isComplete,
    handleAnswer,
  };
}
