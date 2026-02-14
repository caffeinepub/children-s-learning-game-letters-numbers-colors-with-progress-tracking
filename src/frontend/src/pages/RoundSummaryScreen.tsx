import { useEffect } from 'react';
import { GameState } from '../App';
import { useUpdateProgress } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Home, RotateCcw } from 'lucide-react';

interface RoundSummaryScreenProps {
  gameState: GameState;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export default function RoundSummaryScreen({ gameState, onPlayAgain, onGoHome }: RoundSummaryScreenProps) {
  const { mutate: updateProgress } = useUpdateProgress();
  const { identity } = useInternetIdentity();

  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();
  const percentage = Math.round((gameState.score / gameState.totalQuestions) * 100);
  const stars = Math.ceil((gameState.score / gameState.totalQuestions) * 5);

  useEffect(() => {
    if (isLoggedIn) {
      updateProgress({
        category: gameState.category,
        score: gameState.score,
      });
    }
  }, [isLoggedIn, gameState.category, gameState.score, updateProgress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="rounded-3xl shadow-playful-lg border-4 border-primary/20 animate-bounce-in">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <img
                src="/assets/generated/mascot-bear.dim_512x512.png"
                alt="Celebrating bear"
                className="w-32 h-32 md:w-40 md:h-40 animate-wiggle"
              />
            </div>
            <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-2">
              Amazing Work!
            </CardTitle>
            <p className="text-xl md:text-2xl text-muted-foreground">You finished the round!</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Score Display */}
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 text-center">
              <div className="text-6xl md:text-7xl font-bold text-primary mb-2">
                {gameState.score}/{gameState.totalQuestions}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">{percentage}% Correct!</div>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`w-12 h-12 md:w-16 md:h-16 ${
                    index < stars ? 'fill-primary text-primary' : 'text-muted'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>

            {/* Encouragement Message */}
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-foreground">
                {percentage === 100
                  ? '🎉 Perfect score! You are a superstar!'
                  : percentage >= 80
                    ? '⭐ Excellent work! Keep it up!'
                    : percentage >= 60
                      ? '👍 Good job! Practice makes perfect!'
                      : '💪 Nice try! You will do better next time!'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <Button
                onClick={onPlayAgain}
                size="lg"
                className="w-full h-16 text-xl font-bold rounded-2xl shadow-playful hover:shadow-playful-lg"
              >
                <RotateCcw className="w-6 h-6 mr-2" />
                Play Again
              </Button>
              <Button
                onClick={onGoHome}
                size="lg"
                variant="secondary"
                className="w-full h-16 text-xl font-bold rounded-2xl shadow-playful hover:shadow-playful-lg"
              >
                <Home className="w-6 h-6 mr-2" />
                Go Home
              </Button>
            </div>

            {!isLoggedIn && (
              <p className="text-center text-sm text-muted-foreground pt-2">
                Sign in to save your progress!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
