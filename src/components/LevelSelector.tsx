
import { useState } from 'react';
import { Level } from '../data/levelData';
import { Achievement } from '../data/achievementData';
import { Lock, CheckCircle, Star, Book, Target, Clock, AlertTriangle, Lightbulb } from 'lucide-react';

interface LevelSelectorProps {
  levels: Level[];
  achievements: Achievement[];
  onSelectLevel: (level: Level) => void;
  onClose: () => void;
  currentScore: number;
}

const LevelSelector = ({ levels, achievements, onSelectLevel, onClose, currentScore }: LevelSelectorProps) => {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const totalPoints = achievements.reduce((sum, a) => sum + (a.unlocked ? a.points : 0), 0);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900/95 border border-purple-500/50 rounded-xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-purple-300">Mission Control</h2>
            <p className="text-gray-400">Choose your next space exploration mission</p>
          </div>
          <div className="text-right">
            <div className="text-yellow-400 font-bold text-lg">Score: {currentScore}</div>
            <div className="text-green-400">Total Points: {totalPoints}</div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors ml-4"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Levels */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Available Missions</h3>
            <div className="space-y-4">
              {levels.map((level) => (
                <div
                  key={level.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    level.isUnlocked
                      ? level.isCompleted
                        ? 'bg-green-900/30 border-green-500/50 hover:border-green-400/70'
                        : 'bg-slate-800/50 border-purple-500/30 hover:border-purple-400/50'
                      : 'bg-gray-800/30 border-gray-600/30 cursor-not-allowed'
                  }`}
                  onClick={() => level.isUnlocked && setSelectedLevel(level)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`text-lg font-bold ${level.isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                      {level.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      {level.isCompleted && <CheckCircle className="text-green-400" size={20} />}
                      {!level.isUnlocked && <Lock className="text-gray-500" size={20} />}
                    </div>
                  </div>
                  <p className={`text-sm mb-3 ${level.isUnlocked ? 'text-gray-300' : 'text-gray-500'}`}>
                    {level.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs mb-2">
                    <span className={`${level.isUnlocked ? 'text-purple-400' : 'text-gray-500'}`}>
                      <Target size={14} className="inline mr-1" />
                      {level.tasks.length} tasks
                    </span>
                    <span className={`${level.isUnlocked ? 'text-blue-400' : 'text-gray-500'}`}>
                      <Clock size={14} className="inline mr-1" />
                      {level.estimatedDuration}
                    </span>
                    {!level.isUnlocked && (
                      <span className="text-orange-400">
                        Unlock: {level.unlockCondition}
                      </span>
                    )}
                  </div>
                  {level.isUnlocked && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLevel(level);
                      }}
                      className="mt-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    >
                      {level.isCompleted ? 'Replay Mission' : 'Start Mission'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Details */}
          <div className="space-y-6">
            {/* Achievements */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Achievements</h3>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-yellow-400">
                    {unlockedAchievements.length}/{achievements.length}
                  </div>
                  <div className="text-sm text-gray-400">Unlocked</div>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {achievements.slice(0, 5).map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center gap-2 p-2 rounded ${
                        achievement.unlocked
                          ? 'bg-yellow-900/30 border border-yellow-500/30'
                          : 'bg-gray-800/30 border border-gray-600/30'
                      }`}
                    >
                      <span className="text-lg">{achievement.icon}</span>
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${
                          achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'
                        }`}>
                          {achievement.name}
                        </div>
                        <div className={`text-xs ${
                          achievement.unlocked ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {achievement.points} pts
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Level Details */}
            {selectedLevel && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Mission Details</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-purple-300 mb-2">{selectedLevel.name}</h4>
                    <p className="text-gray-300 text-sm mb-2">{selectedLevel.backgroundInfo}</p>
                    <div className="text-xs text-blue-400">
                      <Clock size={12} className="inline mr-1" />
                      Estimated Duration: {selectedLevel.estimatedDuration}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Target size={16} className="text-purple-400" />
                      Objectives:
                    </h5>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {selectedLevel.objectives.map((obj, index) => (
                        <li key={index}>• {obj}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedLevel.tips.length > 0 && (
                    <div>
                      <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <Lightbulb size={16} className="text-yellow-400" />
                        Tips:
                      </h5>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {selectedLevel.tips.slice(0, 3).map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-yellow-400 mt-0.5">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedLevel.warnings.length > 0 && (
                    <div>
                      <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-red-400" />
                        Warnings:
                      </h5>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {selectedLevel.warnings.map((warning, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-400 mt-0.5">•</span>
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Book size={16} className="text-blue-400" />
                      Educational Content:
                    </h5>
                    <div className="text-sm text-gray-300 space-y-1">
                      {selectedLevel.educationalContent.slice(0, 2).map((fact, index) => (
                        <p key={index} className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">•</span>
                          {fact}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelector;
