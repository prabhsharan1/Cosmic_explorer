
import { Planet } from '../data/planetData';

interface PlanetCardProps {
  planet: Planet;
  onTravel: (planet: Planet) => void;
  canAfford: boolean;
}

const PlanetCard = ({ planet, onTravel, canAfford }: PlanetCardProps) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{planet.emoji}</div>
        <h3 className="text-xl font-bold text-white">{planet.name}</h3>
      </div>

      <div className="space-y-2 mb-4 text-sm text-gray-300">
        {planet.description.map((desc, index) => (
          <p key={index}>• {desc}</p>
        ))}
      </div>

      <div className="border-t border-gray-600 pt-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-yellow-400 font-semibold">Fuel Cost:</span>
          <span className="text-white">{planet.fuelCost}%</span>
        </div>

        {planet.warning && (
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 mb-3">
            <p className="text-red-300 text-sm">⚠️ {planet.warning}</p>
          </div>
        )}

        <button
          onClick={() => onTravel(planet)}
          disabled={!canAfford}
          className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 ${
            canAfford
              ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white transform hover:scale-105'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {canAfford ? `Travel to ${planet.name} 🚀` : 'Insufficient Fuel ⛽'}
        </button>
      </div>
    </div>
  );
};

export default PlanetCard;
