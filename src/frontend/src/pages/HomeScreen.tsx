import { Category } from '../backend';
import { useProgress } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, BookOpen, Hash, Palette } from 'lucide-react';

interface HomeScreenProps {
  onStartGame: (category: Category) => void;
}

const CATEGORIES = [
  {
    id: Category.letters,
    name: 'Letters',
    description: 'Learn the alphabet!',
    icon: '/assets/generated/icon-letters.dim_256x256.png',
    IconComponent: BookOpen,
    color: 'from-chart-1 to-chart-5',
  },
  {
    id: Category.numbers,
    name: 'Numbers',
    description: 'Count and learn!',
    icon: '/assets/generated/icon-numbers.dim_256x256.png',
    IconComponent: Hash,
    color: 'from-chart-2 to-chart-1',
  },
  {
    id: Category.colors,
    name: 'Colors',
    description: 'Discover colors!',
    icon: '/assets/generated/icon-colors.dim_256x256.png',
    IconComponent: Palette,
    color: 'from-chart-3 to-chart-2',
  },
];

export default function HomeScreen({ onStartGame }: HomeScreenProps) {
  const { data: progress } = useProgress();
  const { identity, login, clear, isLoginSuccess } = useInternetIdentity();

  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url(/assets/generated/bg-playroom.dim_1920x1080.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <img
              src="/assets/generated/mascot-bear.dim_512x512.png"
              alt="Friendly bear mascot"
              className="w-20 h-20 md:w-24 md:h-24 animate-bounce-in"
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary drop-shadow-lg">
                Learning Fun!
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">Let's play and learn together!</p>
            </div>
          </div>
          <div>
            {isLoggedIn ? (
              <Button onClick={clear} variant="outline" size="lg" className="rounded-2xl shadow-playful">
                Sign Out
              </Button>
            ) : (
              <Button onClick={login} variant="default" size="lg" className="rounded-2xl shadow-playful">
                Sign In
              </Button>
            )}
          </div>
        </header>

        {/* Progress Stats */}
        {isLoggedIn && progress && (
          <Card className="mb-8 rounded-3xl shadow-playful-lg border-4 border-primary/20 animate-bounce-in">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-accent/20 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-accent-foreground">
                    {Number(progress.highestScore)}
                  </div>
                  <div className="text-sm text-muted-foreground">Best Score</div>
                </div>
                <div className="bg-secondary/30 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-secondary-foreground">
                    {Number(progress.roundsPlayed)}
                  </div>
                  <div className="text-sm text-muted-foreground">Games Played</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Selection */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Choose What to Learn!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORIES.map((category, index) => (
              <Card
                key={category.id}
                className="rounded-3xl shadow-playful-lg border-4 hover:scale-105 transition-transform cursor-pointer animate-bounce-in border-primary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onStartGame(category.id)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-3xl blur-xl opacity-50`} />
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="w-32 h-32 mx-auto relative z-10 drop-shadow-lg"
                    />
                  </div>
                  <CardTitle className="text-3xl">{category.name}</CardTitle>
                  <CardDescription className="text-lg">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button
                    size="lg"
                    className="w-full rounded-2xl text-xl py-6 shadow-playful hover:shadow-playful-lg transition-all"
                  >
                    Start Learning!
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground mt-12 pb-4">
          <p>
            © {new Date().getFullYear()} • Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'learning-game'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
