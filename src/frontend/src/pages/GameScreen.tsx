import { useEffect, useState } from 'react';
import { Category } from '../backend';
import { useQuestionsByCategory } from '../hooks/useQueries';
import { QUESTION_BANK } from '../game/questionBank';
import { selectQuestionsForRound } from '../game/questionSelection';
import { useGameSession } from '../game/useGameSession';
import { GameQuestion } from '../game/gameTypes';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle } from 'lucide-react';

interface GameScreenProps {
  category: Category;
  onGameComplete: (score: number, totalQuestions: number) => void;
}

export default function GameScreen({ category, onGameComplete }: GameScreenProps) {
  const { data: backendQuestions, isLoading } = useQuestionsByCategory(category);
  const [gameQuestions, setGameQuestions] = useState<GameQuestion[]>([]);

  useEffect(() => {
    if (!isLoading) {
      let questions: GameQuestion[] = [];

      // Try to use backend questions first
      if (backendQuestions && backendQuestions.length > 0) {
        questions = backendQuestions.map((q) => ({
          prompt: q.prompt,
          correctAnswer: q.answers[0],
          allAnswers: q.answers.length >= 3 ? q.answers.slice(0, 4) : [...q.answers, 'Option A', 'Option B', 'Option C'].slice(0, 4),
          category: q.category,
        }));
      } else {
        // Fallback to built-in question bank
        questions = QUESTION_BANK[category] || [];
      }

      const selectedQuestions = selectQuestionsForRound(questions);
      setGameQuestions(selectedQuestions);
    }
  }, [backendQuestions, isLoading, category]);

  const { currentQuestion, currentQuestionIndex, totalQuestions, score, feedback, isComplete, handleAnswer } =
    useGameSession(gameQuestions);

  useEffect(() => {
    if (isComplete) {
      onGameComplete(score, totalQuestions);
    }
  }, [isComplete, score, totalQuestions, onGameComplete]);

  if (isLoading || gameQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
        <Card className="rounded-3xl shadow-playful-lg p-8">
          <CardContent>
            <p className="text-2xl font-bold text-center">Loading questions...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-bold text-foreground">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-lg font-bold text-primary">Score: {score}</span>
          </div>
          <Progress value={progressPercent} className="h-4 rounded-full" />
        </div>

        {/* Question Card */}
        <Card className="rounded-3xl shadow-playful-lg border-4 border-primary/20 mb-8 animate-bounce-in">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-8">
              {currentQuestion.prompt}
            </h2>

            {/* Feedback */}
            {feedback !== 'none' && (
              <div
                className={`flex items-center justify-center gap-3 mb-6 p-4 rounded-2xl ${
                  feedback === 'correct'
                    ? 'bg-success/20 text-success-foreground'
                    : 'bg-destructive/20 text-destructive-foreground'
                } animate-bounce-in`}
              >
                {feedback === 'correct' ? (
                  <>
                    <CheckCircle2 className="w-8 h-8" />
                    <span className="text-2xl font-bold">Great job!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-8 h-8" />
                    <span className="text-2xl font-bold">Try again next time!</span>
                  </>
                )}
              </div>
            )}

            {/* Answer Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.allAnswers.map((answer, index) => {
                const isCorrectAnswer = answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
                const showFeedback = feedback !== 'none';
                
                let buttonClass = 'w-full h-24 md:h-32 text-2xl md:text-3xl font-bold rounded-2xl shadow-playful hover:shadow-playful-lg transition-all';
                
                if (showFeedback) {
                  if (isCorrectAnswer) {
                    buttonClass += ' bg-success text-success-foreground border-4 border-success';
                  } else if (feedback === 'incorrect') {
                    buttonClass += ' opacity-50';
                  }
                }

                return (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(answer)}
                    disabled={feedback !== 'none'}
                    size="lg"
                    className={buttonClass}
                    variant={showFeedback && isCorrectAnswer ? 'default' : 'secondary'}
                  >
                    {answer}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Mascot Encouragement */}
        <div className="flex justify-center">
          <img
            src="/assets/generated/mascot-bear.dim_512x512.png"
            alt="Friendly bear"
            className={`w-24 h-24 md:w-32 md:h-32 ${feedback === 'correct' ? 'animate-wiggle' : ''}`}
          />
        </div>
      </div>
    </div>
  );
}
