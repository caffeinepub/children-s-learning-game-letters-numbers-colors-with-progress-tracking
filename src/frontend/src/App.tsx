import { useState } from 'react';
import HomeScreen from './pages/HomeScreen';
import GameScreen from './pages/GameScreen';
import RoundSummaryScreen from './pages/RoundSummaryScreen';
import { Category } from './backend';

type View = 'home' | 'game' | 'summary';

export interface GameState {
  category: Category;
  score: number;
  totalQuestions: number;
}

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);

  const handleStartGame = (category: Category) => {
    setSelectedCategory(category);
    setCurrentView('game');
  };

  const handleGameComplete = (score: number, totalQuestions: number) => {
    if (selectedCategory) {
      setGameState({
        category: selectedCategory,
        score,
        totalQuestions,
      });
      setCurrentView('summary');
    }
  };

  const handlePlayAgain = () => {
    setCurrentView('game');
  };

  const handleGoHome = () => {
    setSelectedCategory(null);
    setGameState(null);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen">
      {currentView === 'home' && <HomeScreen onStartGame={handleStartGame} />}
      {currentView === 'game' && selectedCategory && (
        <GameScreen category={selectedCategory} onGameComplete={handleGameComplete} />
      )}
      {currentView === 'summary' && gameState && (
        <RoundSummaryScreen
          gameState={gameState}
          onPlayAgain={handlePlayAgain}
          onGoHome={handleGoHome}
        />
      )}
    </div>
  );
}

export default App;
