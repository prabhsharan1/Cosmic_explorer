
interface GameOverModalProps {
  reason: string;
  visitedPlanets: string[];
  onRestart: () => void;
}

const GameOverModal = ({ reason, visitedPlanets, onRestart }: GameOverModalProps) => {
  const isSuccess = reason.includes('Congratulations');
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 max-w-md w-full border border-purple-500/50 animate-scale-in">
        <div className="text-center">
          <div className="text-6xl mb-4">
            {isSuccess ? '🎉' : '💥'}
          </div>
          
          <h2 className={`text-2xl font-bold mb-4 ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
            {isSuccess ? 'Mission Complete!' : 'Mission Failed!'}
          </h2>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            {reason}
          </p>

          <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Mission Summary</h3>
            <p className="text-gray-300">
              Planets visited: <span className="text-yellow-400 font-semibold">{visitedPlanets.length}</span>
            </p>
            <div className="mt-2 text-sm text-gray-400">
              {visitedPlanets.join(' → ')}
            </div>
          </div>

          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Start New Mission 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
