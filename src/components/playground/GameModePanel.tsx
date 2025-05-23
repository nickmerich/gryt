
import React from 'react';
import ChallengeCard from './game/ChallengeCard';
import StatsPanel from './game/StatsPanel';
import { useGameMode } from './game/useGameMode'; // Import is the same but file is now .tsx
import { GameModePanelProps } from './game/GameModeTypes';

const GameModePanel: React.FC<GameModePanelProps> = ({ mode }) => {
  const {
    challenges,
    activeChallenge,
    timeRemaining,
    userScore,
    earnedBadges,
    startChallenge,
    completeChallenge,
    handleChallengeEnd,
    resetAllChallenges
  } = useGameMode(mode);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Challenge Cards */}
      <div className="lg:col-span-2 space-y-6">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            activeChallenge={activeChallenge}
            timeRemaining={timeRemaining}
            onStart={startChallenge}
            onComplete={completeChallenge}
            onAbort={(id) => handleChallengeEnd(id, false)}
          />
        ))}
      </div>
      
      {/* Stats Panel */}
      <StatsPanel
        userScore={userScore}
        earnedBadges={earnedBadges}
        onResetAll={resetAllChallenges}
      />
    </div>
  );
};

export default GameModePanel;
